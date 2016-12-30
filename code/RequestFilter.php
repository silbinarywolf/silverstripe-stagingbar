<?php

namespace StagingBar;
use Config;
use Debug;
use Controller;
use Versioned;
use Director;
use SSViewer;
use SiteTree;
use ArrayData;

class RequestFilter implements \RequestFilter {
    /**
     * @var boolean
     */
    private static $enabled = true;

    /**
     * @var boolean
     */
    private static $enable_codesniffer = true;

    /**
     * @var array
     */
    private static $css_files = array(
        'default' => '$MODULEDIR/css/staging-default.css',
    );

    /**
     * @var array
     */
    private static $js_files = array(
        'default' => '$MODULEDIR/javascript/staging-default.js',
        'pushdown' => '$MODULEDIR/javascript/staging-default-pushdown.js',
    );

    public function preRequest(\SS_HTTPRequest $request, \Session $session, \DataModel $model) {
  
    }

    public function postRequest(\SS_HTTPRequest $request, \SS_HTTPResponse $response, \DataModel $model) {
        if (!Config::inst()->get(__CLASS__, 'enabled')) {
            return;
        }
        $isStage = ($stage = Versioned::current_stage()) && ($stage !== 'Live');
        if (!$isStage) {
            return;
        }
        if (!Config::inst()->get('SSViewer', 'theme_enabled')) {
            // Disable in CMS
            return;
        }

        $url = $request->getURL(false);
        if (!$url) {
            $url = 'home';
        }
        $currentPage = SiteTree::get_by_link($url);
        if (!$currentPage || !$currentPage->canView()) {
            return;
        }

        $body = $response->getBody();
        // Put CSS at the bottom of the head
        $requirements = '';
        foreach (Config::inst()->get(__CLASS__, 'css_files') as $css) {
            if (!$css) {
                continue;
            }
            $css = str_replace(array('$MODULEDIR'), array(Utility::MODULE_DIR), $css);
            $css = Director::baseURL().$css;
            $requirements .= '<link rel="stylesheet" type="text/css" href="'.$css.'" />';
        }
        $body = preg_replace("/(<\/head>)/i", $requirements . "\\1", $body);

        // Add staging bar to bottom of HTML
        $template = new SSViewer(array('StagingBar'));
        $CMSEditLink = '';
        if ($currentPage && $currentPage->canEdit()) {
            $CMSEditLink = $currentPage->CMSEditLink();
        }
        $variables = array(
            'EditLink' => $CMSEditLink,
            'LiveLink' => Director::baseURL().$url.'?stage=Live',
            'IsCodeSnifferEnabled' => Config::inst()->get(__CLASS__, 'enable_codesniffer'),
        );
        // NOTE(Jake): Perhaps add $this->extend('updateVariables', $variables);
        $html = $template->process(new ArrayData($variables));
        foreach (Config::inst()->get(__CLASS__, 'js_files') as $js) {
            if (!$js) {
                continue;
            }
            $js = str_replace(array('$MODULEDIR'), array(Utility::MODULE_DIR), $js);
            $js = Director::baseURL().$js;
            $html .= '<script type="text/javascript" src="'.$js.'"></script>';
        }
        $body = preg_replace("/(<\/body[^>]*>)/i", $html . "\\1", $body);

        $response->setBody($body);
    }
}