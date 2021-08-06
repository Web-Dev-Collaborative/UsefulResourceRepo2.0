# Table Key Events

Use Plugin: [bootstrap-table-key-events](https://github.com/wenzhixin/bootstrap-table/tree/master/src/extensions/key-events)

## Usage

```html
<script src="extensions/cookie/bootstrap-table-key-events.js"></script>
```

## Options

### keyEvents

- type: Boolean
- description:
  True to enable the key events. The key event list is:
  _ s: It will be focused the search textbox if it is enabled.
  _ r: It will refresh the table if the showRefresh option is enabled.
  _ t: It will toggle the table view if the showToggle option is enabled.
  _ p: It will fires the pagination switch if the showPaginationSwitch is enabled.
  _ left: It will go to prev page if the pagination is true.
  _ right: It will go to next page if the pagination is true.
- default: `false`
