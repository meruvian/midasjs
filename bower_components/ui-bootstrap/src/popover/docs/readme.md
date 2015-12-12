A lightweight, extensible directive for fancy popover creation. The popover
directive supports multiple placements, optional transition animation, and more.

Like the Bootstrap jQuery plugin, the popover **requires** the tooltip
module.

There are two versions of the popover: `uib-popover` and `uib-popover-template`:

- `uib-popover` takes text only and will escape any HTML provided for the popover
  body.
- `uib-popover-html` takes an expression that evaluates to an html string. *The user is responsible for ensuring the
  content is safe to put into the DOM!*
- `uib-popover-template` a URL representing the location of a template to
  use for the popover body. Note that the contents of this template need to be
  wrapped in a tag, e.g., `<div></div>`.

The popover directives provides several optional attributes to control how it
will display:

- `popover-title`: A string to display as a fancy title.
- `popover-placement`: Where to place it? Defaults to "top", but also accepts
  "bottom", "left", "right".
- `popover-animation`: Should it fade in and out? Defaults to "true".
- `popover-popup-delay`: For how long should the user have to have the mouse
  over the element before the popover shows (in milliseconds)? Defaults to 0.
- `popover-popup-close-delay`: For how long should the popover remain open
  after the close trigger event? Defaults to 0.
- `popover-trigger`: What should trigger the show of the popover? See the
  `tooltip` directive for supported values.
- `popover-append-to-body`: Should the tooltip be appended to `$body` instead of
  the parent element?
- `popover-is-open` <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: false)_:
  Whether to show the popover.

The popover directives require the `$position` service.

The popover directive also supports various default configurations through the
$tooltipProvider. See the [tooltip](#tooltip) section for more information.

**Known issues**

For Safari 7+ support, if you want to use **focus** `popover-trigger`, you need to use an anchor tag with a tab index. For example:

```
<a tabindex="0" uib-popover="Test" popover-trigger="focus" class="btn btn-default">
  Click Me
</a>
```
