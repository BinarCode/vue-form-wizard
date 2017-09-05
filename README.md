
# vue-form-wizard

<p align="center">
  <a href="https://www.npmjs.com/package/vue-form-wizard"><img src="https://img.shields.io/npm/v/vue-form-wizard.svg"></a>
  <a href="https://www.npmjs.com/package/vue-form-wizard"><img src="https://img.shields.io/npm/dt/vue-form-wizard.svg"></a>
</p>

A dynamic wizard to split your forms easier

Vue-form-wizard is a vue based component with no external depenendcies which simplifies tab wizard management.

## Demos:
Basic [demo](https://jsfiddle.net/bt5dhqtf/97/)

Other demos:
* [Squared steps](https://jsfiddle.net/bt5dhqtf/98/)
* [Tabbed steps](https://jsfiddle.net/bt5dhqtf/99/)
* [Sizing](https://jsfiddle.net/CristiJ/bt5dhqtf/924/)
* [Step index](https://jsfiddle.net/bt5dhqtf/100/) Start at any step. Note: start-index is zero-based and the count starts at 0
* [Custom button and title text](https://jsfiddle.net/bt5dhqtf/101/)
* [Custom title slot](https://jsfiddle.net/bt5dhqtf/102/)
* [Customized buttons with slots](https://jsfiddle.net/bt5dhqtf/103/) Replace stuff you don't like
* [Call a function before tab switch](https://jsfiddle.net/bt5dhqtf/105/)
* [Complete form example](https://jsfiddle.net/CristiJ/bt5dhqtf/286/) integrated with [vue-form-generator](https://github.com/icebob/vue-form-generator)
* [Element UI form integration](https://jsfiddle.net/bt5dhqtf/409/)
* [Vue router integration](https://jsfiddle.net/bt5dhqtf/267/) You can place a `router-view` inside the wizard and have a separate page per tab. A `route` prop must be passed to the tabs you want to handle certain tabs
* [Async validation with error message](https://jsfiddle.net/CristiJ/bt5dhqtf/298/) `before-change` prop can accept a promise that is resolved with `true` which will execute the promise before switching to another step/tab (NOTE: This feature is not present in the npm package yet)

In browser [playground](https://cristijora.github.io/vue-form-wizard/#/?id=playground)

# [Documentation](https://cristijora.github.io/vue-form-wizard/#/)
