# WIP vue-tab-wizard
A dynamic tab wizard to split your forms easier

Forms are hard to handle especially if you have a lot of fields. A page often looks very ugly when it has a ton of form fields.
There are many tab wizards out there in the wild, but most of them are jQuery based and once you have a lot of tabs, they are hard to manage/modify 
or customize in an easy declarative way.
Vue-tab-wizard is a simple component which simplifies your tab wizard and lets you focus on the functional part of your app rather than
wasting time on details. Just forget about id's, external scripts and jQuery dependencies

# Demo
Refer to this [fiddle](https://jsfiddle.net/CristiJ/bt5dhqtf/8/)

Note: For now vue-tab-wizard requires bootstrap to look as it should. Also vue-tab-wizard works with themify-icons (WIP)

# Usage
```html
<tab-wizard>
  <tab-content title="Personal details">
    My first tab content
  </tab-content>
  <tab-content title="Additional Info">
      My second tab content
   </tab-content>
   <tab-content title="Last step">
     Yuhuuu! This seems pretty damn simple
   </tab-content>
</tab-wizard>
```
