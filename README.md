# Staging Bar

Adds a navigation bar to the frontend when viewing a draft / in ?stage=Stage mode.

# Screenshot

![stagingbar](https://cloud.githubusercontent.com/assets/3859574/21563347/99e6dca2-ced5-11e6-9b34-ee579db3920b.png)

# Quick Install

1) Put module in root folder
2) Enjoy!

# Configuration

```yml
StagingBar\RequestFilter:
  # Enable/Disable staging bar
  enabled: true
  # Enable/disable Squiz CodeSniffer accessibility checker
  enable_codesniffer: true
  # Add additional CSS/JS for bar
  css_files:
  	'custom': 'mysite/css/staging-default.css'
  js_files:
  	'custom': 'mysite/javascript/staging-default.js'
  	# Disable margin-top push down of content (can be buggy depending on frontend build)
  	'pushdown': ''
```

# Supports

- Silverstripe 3.1 and up
- Internet Explorer 9 and up (Browser must support document.querySelectorAll())

# Override Staging Bar template

1) Go into stagingbar/templates/Includes/StagingBar.ss
2) Copy paste into your theme Includes folder.
3) Modify however you want.

# Credits

[Squizlabs - HTML Code Sniffer](http://squizlabs.github.io/HTML_CodeSniffer/)