<div class="ss-staging-bar js-ss-staging-bar">
	Currently viewing: 
	<% if $CurrentReadingMode == "Stage.Stage" %>
		Draft
	<% else %>
		$CurrentReadingMode
	<% end_if %>
	<ul class="ss-staging-bar-list-reset">
		<% if $EditLink %>
			| <a href="$EditLink">Edit</a>
		<% end_if %>
		<% if $LiveLink %>
			| <a href="$LiveLink">Switch to Live view</a>
		<% end_if %>
		<% if $IsCodeSnifferEnabled %>
			| <button class="js-ss-staging-bar-codesniffer" type="button">Open Accessibility Checker</button>
		<% end_if %>
		| <button class="js-ss-staging-bar-close" type="button" title="Hide bar until next page refresh">Hide</button>
	</ul>
</div>
