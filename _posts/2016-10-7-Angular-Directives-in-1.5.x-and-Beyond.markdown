---
layout: post
title:  "Directives in Angular 1.5.x and Beyond"
date:   2016-10-07 06:31:10

description: "Before, we used directives for almost everything. That all changes in Angular 1.5 and 2."
tags: AngularJS
categories: AngularJS
comments: true
---

**Angular 1.5 introduces a new way of building Angular applications coming in the form of one-way data binding and a component-based architecture.**

Beginning in Angular 1.5, we almost never write directives. Well, I take that back. All components are directives. So I guess we always write directives...

Anyway, moving right along...
The use of directives is largely replaced by the use of components, and the only real time you should write a directive is if you require custom DOM manipulation without the use of a template. (See example in
[Aviv Ben-Yosef's article](http://www.codelord.net/2016/09/06/angular-interview-question-deep-dive-implement-ng-click/)).

Simply put, if what you are trying to accomplish requires that you create a controller and a template, then use a component.

If you require more clarification about when to use directives starting in Angular 1.5, check out [the directives section of Todd Motto's styleguide](https://github.com/toddmotto/angular-styleguide/blob/master/README.md#directives) and [ the Angular docs](https://docs.angularjs.org/guide/component).

# You mentioned one-way data flow...

Yes. So before Angular 1.5, data was passed down from controllers down into components (directives), and the component in turn mutated the parent data. This seems logical, but it sometimes made for slow Angular applications.

Now, Angular apps rely on one-way data binding. The key difference here is that the data being passed down to components is treated as immutable. The component makes a clone of the parent data, mutates it, and sends it back up the chain via an event.

In this example, you can see how we use ```angular.copy``` to clone the data, and then pass data back up via ```$event``` triggered by the ```$onChanges ``` lifecycle hook.

```javascript

var myComponent = {
  templateUrl: './template.html',
  
  bindings: {
    user: '<', //new, one-way binding
    onUpdate: '&' //same old expression binding
  },
  controller: function () {

    //clone data
    this.$onChanges = function (changes) {
      if (changes.user) {
        this.user = angular.copy(this.user);
      }
    };

    //mutates user and propagates back up
    // to the controller when called
    this.updateUser = function () {
      this.onUpdate({
        $event: {
          user: this.user
        }
      });
    };
  },

  template: 
  `
    <div>
      <input type="text" ng-model="$ctrl.user.name">
      <input type="text" ng-model="$ctrl.user.location">
      <a href="" ng-click="$ctrl.updateUser();">Update</a>
    </div>
  `

}

```
The Angular team describes components as an opinionated, stripped-down version of directives. And to be honest, there's not a huge distinction when it comes to syntax, but there are differences.

# Some key things to remember:


-Components don't use a link function. Any logic or lifecycle hooks are placed in the controller. 

-Components have a default isolate scope.

-The property ```bindings: {}``` serves as a wrapper for the previously used ```bindToController: {}``` and ```scope: {}```, so you never have to access $scope directly.

-The default controllerAs syntax for components is ```$ctrl```.

-Also remember that the name of the component is in camelCase and the HTML reference is in kebab-case.

# Tell me more things...

Ok, I'll tell you more things. Angular does a great job of documenting the [differences between directives and components](https://docs.angularjs.org/guide/component) in their docs. [Todd Motto's opinionated style guides](https://github.com/toddmotto/angular-styleguide/blob/master/README.md) are also great. Be sure to check those out if you're learning about the current way to build Angular apps.

This is just some basic information about the use of components. I'm also working through many other Angular JS concepts and providing examples in a [github repo] (https://github.com/wesaspinall/ng-koans). I hope you find this helpful.

Thnks fr rdng,

Wes Aspinall



