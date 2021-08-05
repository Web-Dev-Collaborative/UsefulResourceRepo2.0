( this[ "webpackJsonpreact-cheat-sheet" ] = this[ "webpackJsonpreact-cheat-sheet" ] || [] ).push( [
  [ 0 ], {
    12: function ( e, t, n ) {
      e.exports = n( 23 )
    },
    22: function ( e, t, n ) {},
    23: function ( e, t, n ) {
      "use strict";
      n.r( t );
      var r = n( 0 ),
        o = n.n( r ),
        a = n( 10 ),
        c = n.n( a ),
        s = n( 4 ),
        l = n( 5 ),
        i = n( 7 ),
        m = n( 6 ),
        p = n( 8 ),
        d = n( 1 ),
        h = n.n( d ),
        u = n( 2 ),
        g = n( 3 ),
        f = n( 11 ),
        v = function ( e, t ) {
          return e.map( ( function ( e ) {
            return Object( f.a )( {}, e, {}, t )
          } ) )
        },
        b = v( [ {
          name: "render",
          example: "render() {\n  return <div />;\n}",
          reference: "https://reactjs.org/docs/react-component.html#render"
        }, {
          name: "constructor",
          example: "constructor(props) {\n  super(props);\n  this.state = {\n    list: props.initialList\n  };\n}\n\n// where props aren't used in constructor\n\nconstructor() {\n  super();\n  this.state = {\n    list: []\n  };\n}",
          reference: "https://reactjs.org/docs/react-component.html#constructor"
        }, {
          name: "componentWillMount",
          example: "componentWillMount() {\n  // invoked once.\n  // fires before initial 'render'\n}",
          reference: "https://reactjs.org/docs/react-component.html#componentwillmount"
        }, {
          name: "componentDidMount",
          example: "componentDidMount() {\n  // good for AJAX: fetch, ajax, or subscriptions.\n\n  // invoked once (client-side only).\n  // fires before initial 'render'\n}",
          reference: "https://reactjs.org/docs/react-component.html#componentdidmount"
        }, {
          name: "componentWillReceiveProps",
          example: "componentWillReceiveProps(nextProps) {\n  // invoked every time component recieves new props.\n  // does not before initial 'render'\n}",
          reference: "https://reactjs.org/docs/react-component.html#componentwillreceiveprops"
        }, {
          name: "shouldComponentUpdate",
          example: "shouldComponentUpdate(nextProps, nextState) {\n  // invoked before every update (new props or state).\n  // does not fire before initial 'render'.\n}",
          reference: "https://reactjs.org/docs/react-component.html#shouldcomponentupdate"
        }, {
          name: "componentWillUpdate",
          example: "componentWillUpdate(nextProps, nextState) {\n  // invoked immediately before update (new props or state).\n  // does not fire before initial 'render'.\n\n  // (see componentWillReceiveProps if you need to call setState)\n}",
          reference: "https://reactjs.org/docs/react-component.html#componentwillupdate",
          notSupported: "this.setState"
        }, {
          name: "componentDidUpdate",
          example: "componentDidUpdate(prevProps, prevState) {\n  // invoked immediately after DOM updates\n  // does not fire after initial 'render'\n}",
          reference: "https://reactjs.org/docs/react-component.html#componentdidupdate"
        }, {
          name: "componentWillUnmount",
          example: "componentWillUnmount() {\n  // invoked immediately before a component is unmounted.\n}",
          reference: "https://reactjs.org/docs/react-component.html#componentwillunmount"
        }, {
          name: "setState (function)",
          example: "// good for state transitions\n\nthis.setState((prevState, props) => {\n  return {count: prevState.count + props.step};\n});",
          reference: "https://reactjs.org/docs/react-component.html#setstate"
        }, {
          name: "setState (object)",
          example: "// good for static values\n\nthis.setState({mykey: 'my new value'});",
          reference: "https://reactjs.org/docs/react-component.html#setstate"
        }, {
          name: "setState (optional callback)",
          example: "// fires after setState\n// prefer componentDidUpdate\n\nthis.setState(\n  (prevState, props) => ({ count: prevState.count + props.step }),\n  () => console.log(this.state.count)\n);",
          reference: "https://reactjs.org/docs/react-component.html#setstate"
        }, {
          name: "forceUpdate",
          example: "// forces a re-render; AVOID if possible\n\nthis.forceUpdate();",
          reference: "https://reactjs.org/docs/react-component.html#forceupdate"
        }, {
          name: "displayName",
          example: 'displayName: "MyComponent"',
          reference: "https://reactjs.org/docs/react-component.html#defaultprops"
        }, {
          name: "defaultProps",
          example: "class Greeting extends React.Component {\n      render() {\n        return <h1>Hi {this.props.name}</h1>\n      }\n    }\n    \n    CustomButton.defaultProps = {\n      name: 'guest'\n    };",
          reference: "https://reactjs.org/docs/react-component.html#defaultprops"
        } ], {
          module: "react",
          category: "Component"
        } ),
        y = v( [ {
          name: "Children.map",
          example: "React.Children.map(this.props.children, (child, i) => {\n    return child;\n})",
          reference: "https://reactjs.org/docs/react-api.html#reactchildrenmap"
        }, {
          name: "Children.forEach",
          example: "React.Children.forEach(this.props.children, (child, i) => {\n  console.log(child + ' at index: ' + i);\n})",
          reference: "https://reactjs.org/docs/react-api.html#reactchildrenforeach"
        }, {
          name: "Children.count",
          example: "React.Children.count(this.props.children);",
          reference: "https://reactjs.org/docs/react-api.html#reactchildrencount"
        }, {
          name: "Children.only",
          example: "React.Children.only(this.props.children);",
          reference: "https://reactjs.org/docs/react-api.html#reactchildrenonly"
        }, {
          name: "Children.toArray",
          example: "React.Children.toArray(this.props.children)",
          reference: "https://reactjs.org/docs/react-api.html#reactchildrentoarray"
        } ], {
          module: "react",
          category: "Children"
        } ),
        C = v( [ {
          name: "Context (example)",
          example: '// requires \'prop-types\' library\n\nimport { string } from "prop-types";\n\nclass Cowboy extends React.Component {\n  childContextTypes: {\n    salutation: string\n  }\n\n  getChildContext() {\n    return { salutation: "Howdy" };\n  }\n\n  render() {\n    return React.Children.only(this.props.children);\n  }\n}\n\nconst Greeting = (props, context) =>\n  <div>{context.salutation} {props.name}.</div>\n\nGreeting.contextTypes = {\n  salutation: PropTypes.string\n}\n\n// <Greeting name="Michael" />\n// => Michael.\n\n// <Cowboy><Greeting name="Michael" /></Cowboy>\n// => Howdy Michael.\n',
          reference: "https://facebook.github.io/react/docs/context.html"
        }, {
          name: "contextTypes",
          example: "// add to the context-aware component\n// requires 'prop-types' library\n\ncontextTypes: {\n  color: PropTypes.string\n},",
          reference: "https://facebook.github.io/react/docs/context.html"
        }, {
          name: "childContextTypes",
          example: "// add to the context provider\n// requires 'prop-types' library\n\nchildContextTypes: {\n  color: PropTypes.string\n},",
          reference: "https://facebook.github.io/react/docs/context.html"
        }, {
          name: "getChildContext",
          example: '// add to the context provider\n\ngetChildContext() {\n  return {color: "purple"};\n}',
          reference: "https://facebook.github.io/react/docs/context.html"
        } ], {
          module: "react",
          category: "Context"
        } ),
        x = v( [ {
          name: "render",
          example: 'import { render } from "react-dom";\n\nrender(\n  <MyComponent />,\n  document.getElementById("component-root"),\n  () => console.log("MyComponent mounted.")\n);',
          reference: "https://reactjs.org/docs/react-dom.html#render",
          module: "react-dom"
        }, {
          name: "hydrate",
          example: 'import { hydrate } from "react-dom";\n\nhydrate(\n  <MyComponent />,\n  document.getElementById("component-root"),\n  () => console.log("MyComponent hydrated.")\n);',
          reference: "https://reactjs.org/docs/react-dom.html#hydrate",
          module: "react-dom"
        }, {
          name: "unmountComponentAtNode",
          example: "import { unmountComponentAtNode } from \"react-dom\";\n\nunmountComponentAtNode(document.getElementById('MyComponent'))",
          reference: "https://reactjs.org/docs/react-dom.html#unmountcomponentatnode",
          module: "react-dom"
        }, {
          name: "findDOMNode",
          example: 'import { findDOMNode } from "react-dom";\n\nfindDOMNode(componentRef);',
          reference: "https://reactjs.org/docs/react-dom.html#finddomnode",
          module: "react-dom"
        }, {
          name: "createPortal",
          example: 'import { createPortal } from "react-dom";\n\nclass MyPortalComponent extends React.Component {\n  render() {\n\n    return createPortal(\n      this.props.children,\n      document.getElementById("portal-element"),\n    );\n  }\n}',
          reference: "https://reactjs.org/docs/react-dom.html#createportal",
          module: "react-dom"
        }, {
          name: "renderToString",
          example: 'import { renderToString } from "react-dom/server";\nReactDOMServer.renderToString(<MyComponent />);',
          reference: "https://reactjs.org/docs/react-dom-server.html#rendertostring",
          module: "react-dom/server"
        }, {
          name: "renderToStaticMarkup",
          example: 'import {renderToStaticMarkup} from "react-dom/server";\nrenderToStaticMarkup(<MyComponent />);',
          reference: "https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup",
          module: "react-dom/server"
        }, {
          name: "renderToNodeStream",
          example: 'import { renderToNodeStream } from "react-dom/server";\nrenderToNodeStream(<MyComponent />);',
          reference: "https://reactjs.org/docs/react-dom-server.html#rendertonodestream",
          module: "react-dom/server"
        }, {
          name: "renderToStaticNodeStream",
          example: 'import { renderToStaticNodeStream } from "react-dom/server";\nrenderToStaticNodeStream(<MyComponent />);',
          reference: "https://reactjs.org/docs/react-dom-server.html#rendertostaticnodestream",
          module: "react-dom/server"
        } ], {
          category: "react-dom"
        } ),
        j = v( [ {
          name: "Simulate (basic)",
          example: "var subject = TestUtils.renderIntoDocument(\n  <div onClick={handleClick} />\n);\n\nTestUtils.Simulate.click(subject);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#simulate",
          playground: "http://jsbin.com/foxini/edit?html,js,console"
        }, {
          name: "Simulate (with data)",
          example: 'function handleChange (event) {\n  console.log(\'A change was simulated with key: \' + event.key);\n}\n\nvar subject = TestUtils.renderIntoDocument(\n  <input type="text" onChange={handleChange} />\n);\n\nTestUtils.Simulate.change(subject, { key: "Enter" });',
          reference: "https://facebook.github.io/react/docs/test-utils.html#simulate",
          playground: "http://jsbin.com/wiqile/edit?html,js,console"
        }, {
          name: "renderIntoDocument",
          example: "var componentTree = TestUtils.renderIntoDocument(<div><span /></div>);\n\nconsole.log('You mounted a component tree with a ' + componentTree.tagName + ' at the root!');",
          reference: "https://facebook.github.io/react/docs/test-utils.html#renderintodocument",
          playground: "http://jsbin.com/buzigo/edit?html,js,console"
        }, {
          name: "mockComponent",
          example: "// no example",
          reference: "https://facebook.github.io/react/docs/test-utils.html#mockcomponent"
        }, {
          name: "isElement",
          example: "expect(TestUtils.isElement(<div />)).toBe(true);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#iselement",
          playground: "http://jsbin.com/jiyune/edit?html,js,console"
        }, {
          name: "isElementOfType",
          example: "var MyComponent = React.createClass({\n  render () {\n    return <div />;\n  }\n});\n\nexpect(\n  TestUtils.isElementOfType(<MyComponent />, MyComponent)\n).toBe(true);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#iselementoftype",
          playground: "http://jsbin.com/pasohi/edit?html,js,console"
        }, {
          name: "isDOMComponent",
          example: "var subject = TestUtils.renderIntoDocument(<div />);\n\nexpect(\n  TestUtils.isDOMComponent(subject)\n).toBe(true);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#isdomcomponent",
          playground: "http://jsbin.com/fadoka/edit?html,js,console"
        }, {
          name: "isCompositeComponent",
          example: "var subject = TestUtils.renderIntoDocument(\n  <CompositeComponent />\n);\n\nexpect(\n  TestUtils.isCompositeComponent(subject)\n).toBe(true);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#iscompositecomponent",
          playground: "http://jsbin.com/vocofa/edit?html,js,console"
        }, {
          name: "isCompositeComponentWithType",
          example: "var CompositeComponent = React.createClass({\n  render () {\n    return <div />;\n  }\n});\n\nvar subject = TestUtils.renderIntoDocument(\n  <CompositeComponent />\n);\n\nexpect(\n  TestUtils.isCompositeComponentWithType(\n    subject,\n    CompositeComponent\n  )\n).toBe(true);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#iscompositecomponentwithtype",
          playground: "http://jsbin.com/kegoqe/edit?html,js,console"
        }, {
          name: "findAllInRenderedTree",
          example: "var CompositeComponent = React.createClass({\n  render () {\n    return <div><div /></div>;\n  }\n});\n\nvar componentTree = TestUtils.renderIntoDocument(\n  <CompositeComponent />\n);\n\nvar allDivs = TestUtils.findAllInRenderedTree(\n  componentTree,\n  (c) => c.tagName === 'DIV'\n)\n\nexpect(allDivs).toBeAn('array');\nexpect(allDivs.length).toBe(2);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#findallinrenderedtree",
          playground: "http://jsbin.com/dozevu/edit?html,js,console"
        }, {
          name: "scryRenderedDOMComponentsWithClass",
          example: 'var CompositeComponent = React.createClass({\n  render () {\n    return (\n      <div className="target">\n        <div className="not-target">\n          <div className="target" />\n        </div>\n      </div>\n    );\n  }\n});\n\nvar componentTree = TestUtils.renderIntoDocument(\n  <CompositeComponent />\n);\n\nvar allDOMComponentsWithMatchingClass = TestUtils.scryRenderedDOMComponentsWithClass(\n  componentTree,\n  \'target\'\n);\n\nexpect(allDOMComponentsWithMatchingClass).toBeAn(\'array\');\nexpect(allDOMComponentsWithMatchingClass.length).toBe(2);',
          reference: "https://facebook.github.io/react/docs/test-utils.html#scryrendereddomcomponentswithclass",
          playground: "http://jsbin.com/kujeda/edit?html,js,console"
        }, {
          name: "findRenderedDOMComponentWithClass",
          example: "var MyCompositeComponent = React.createClass({\n  render () {\n    return <MyNestedComponent />;\n  }\n});\n\nvar MyNestedComponent = React.createClass({\n  render () {\n    return <div className=\"nested\"/>;\n  }\n});\n\nvar componentTree = TestUtils.renderIntoDocument(<MyCompositeComponent />);\n\nvar singleComponentWithMatchedClass = TestUtils.findRenderedDOMComponentWithClass(\n  componentTree,\n  'nested'\n);\n\nexpect(singleComponentWithMatchedClass).toBeAn('object');\nexpect(singleComponentWithMatchedClass).toNotBeAn('array');\nexpect(singleComponentWithMatchedClass.className).toBe('nested');",
          reference: "https://facebook.github.io/react/docs/test-utils.html#findrendereddomcomponentwithclass",
          playground: "http://jsbin.com/kuteve/edit?html,js,console"
        }, {
          name: "scryRenderedDOMComponentsWithTag",
          example: "var CompositeComponent = React.createClass({\n  render () {\n    return <div><div /></div>;\n  }\n});\n\nvar componentTree = TestUtils.renderIntoDocument(\n  <CompositeComponent />\n);\n\nvar allDivs = TestUtils.scryRenderedDOMComponentsWithTag(\n  componentTree,\n  'DIV'\n);\n\nexpect(allDivs).toBeAn('array');\nexpect(allDivs.length).toBe(2);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#scryrendereddomcomponentswithtag",
          playground: "http://jsbin.com/hehede/edit?html,js,console"
        }, {
          name: "findRenderedDOMComponentWithTag",
          example: "var MyCompositeComponent = React.createClass({\n  render () {\n    return <MyNestedComponent />;\n  }\n});\n\nvar MyNestedComponent = React.createClass({\n  render () {\n    return <div />;\n  }\n});\n\nvar componentTree = TestUtils.renderIntoDocument(<MyCompositeComponent />);\n\nvar onlyDiv = TestUtils.findRenderedDOMComponentWithTag(\n  componentTree,\n  'div'\n);\n\nexpect(onlyDiv).toBeAn('object');\nexpect(onlyDiv).toNotBeAn('array');\nexpect(onlyDiv.tagName).toBe('DIV');",
          reference: "https://facebook.github.io/react/docs/test-utils.html#findrendereddomcomponentwithtag",
          playground: "http://jsbin.com/puhule/edit?html,js,console"
        }, {
          name: "scryRenderedComponentsWithType",
          example: "var MyCompositeComponent = React.createClass({\n  render () {\n    return (\n      <div>\n        <Target />\n        <br />\n        <Target />\n      </div>\n    )\n  }\n});\n\nvar Target = React.createClass({\n  render () {\n    return <div />;\n  }\n});\n\nvar componentTree = TestUtils.renderIntoDocument(\n  <MyCompositeComponent />\n);\n\nvar allTargetComponents = TestUtils.scryRenderedComponentsWithType(\n  componentTree,\n  Target\n);\n\nexpect(allTargetComponents).toBeAn('array');\nexpect(allTargetComponents.length).toBe(2);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#scryrenderedcomponentswithtype",
          playground: "http://jsbin.com/lesowo/edit?html,js,console"
        }, {
          name: "findRenderedComponentWithType",
          example: "var MyCompositeComponent = React.createClass({\n  render () { return <TargetComponent /> }\n});\n\nvar TargetComponent = React.createClass({\n  render () { return <div /> }\n});\n\nvar componentTree = TestUtils.renderIntoDocument(\n  <MyCompositeComponent />\n);\n\nvar onlyTargetComponent = TestUtils.findRenderedComponentWithType(\n  componentTree,\n  TargetComponent\n);\n\nexpect(onlyTargetComponent).toBeAn('object');\nexpect(onlyTargetComponent).toNotBeAn('array');\nexpect(TestUtils.isCompositeComponentWithType(\n  onlyTargetComponent,\n  TargetComponent\n)).toBe(true);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#findrenderedcomponentwithtype",
          playground: "http://jsbin.com/wosane/edit?html,js,console"
        }, {
          name: "Shallow rendering (basics)",
          example: "// 1. create a renderer\nvar renderer = TestUtils.createRenderer();\n\n// 2. render component into renderer\nrenderer.render(<MyComponent />);\n\n// 3. capture renderer output\nvar subject = renderer.getRenderOutput();\n\n// 4. make assertions\nexpect(subject.type).toBe('div');",
          reference: "https://facebook.github.io/react/docs/test-utils.html#shallow-rendering",
          playground: "http://jsbin.com/raloqu/edit?html,js,console"
        }, {
          name: "Shallow rendering (type example)",
          example: "var renderer = TestUtils.createRenderer();\n\nrenderer.render(<MyComponent />);\n\nvar subject = renderer.getRenderOutput();\n\nexpect(subject.type).toBe('div');  // => true",
          reference: "https://facebook.github.io/react/docs/test-utils.html#shallow-rendering",
          playground: "http://jsbin.com/xojudi/edit?html,js,console"
        }, {
          name: "Shallow rendering (props example)",
          example: "var renderer = TestUtils.createRenderer();\n\nrenderer.render(<MyComponent className=\"my-component\" />);\n\nvar subject = renderer.getRenderOutput();\n\nexpect(subject.props.className).toBe('my-component'); // => true",
          reference: "https://facebook.github.io/react/docs/test-utils.html#shallow-rendering",
          playground: "http://jsbin.com/najubu/edit?html,js,console"
        }, {
          name: "Shallow rendering (child-count example)",
          example: "var renderer = TestUtils.createRenderer();\n\nrenderer.render(\n  <MyList items={[1, 2, 3]} />\n);\n\nvar subject = renderer.getRenderOutput();\n\nvar childCount = React.Children.count(subject.props.children);\n\nexpect(childCount).toBe(3); // => true",
          reference: "https://facebook.github.io/react/docs/test-utils.html#shallow-rendering",
          playground: "http://jsbin.com/dayomi/edit?html,js,console"
        }, {
          name: "Shallow rendering (child-equality example)",
          example: "var renderer = TestUtils.createRenderer();\n\nrenderer.render(\n  <MyComponent>\n    <div>Thing 1</div>\n    <div>Thing 2</div>\n  </MyComponent>\n);\n\nvar subject = renderer.getRenderOutput();\n\nexpect(subject.props.children).toEqual([\n  <div>Thing 1</div>,\n  <div>Thing 2</div>\n]); // => true",
          reference: "https://facebook.github.io/react/docs/test-utils.html#shallow-rendering",
          playground: "http://jsbin.com/sexeve/edit?html,js,console"
        }, {
          name: "Shallow rendering (events example)",
          example: "var renderer = TestUtils.createRenderer();\n\nvar spy = expect.createSpy();\n\nrenderer.render(<MyComponent onClick={spy} />);\n\nvar subject = renderer.getRenderOutput();\n\nexpect(spy.call.length).toEqual(1); // => true",
          reference: "https://facebook.github.io/react/docs/test-utils.html#shallow-rendering",
          playground: "http://jsbin.com/quzeya/edit?html,js,console"
        }, {
          name: "Shallow rendering (state changes example)",
          example: "var renderer = TestUtils.createRenderer();\n\nrenderer.render(<ClickCounter />);\n\n// test initial rendering\nvar result = renderer.getRenderOutput();\n\nexpect(result.props.children).toEqual(0);\n\n\n// test post-click rendering\nresult.props.onClick();\n\nvar clickedResult = renderer.getRenderOutput();\n\nexpect(clickedResult.props.children).toEqual(1);",
          reference: "https://facebook.github.io/react/docs/test-utils.html#shallow-rendering",
          playground: "http://jsbin.com/nobavu/edit?html,js,console"
        } ], {
          module: "react-dom/test-utils",
          category: "test-utils"
        } ),
        T = [ {
          name: "componentWillMount",
          setStateTriggersUpdate: "no",
          calledFor: "initial render()",
          useFor: ".",
          receivesContext: "no"
        }, {
          name: "componentDidMount",
          setStateTriggersUpdate: "yes",
          calledFor: "initial render()",
          useFor: "async setup, refs, DOM manipulation",
          receivesContext: "no"
        }, {
          name: "componentWillReceiveProps",
          setStateTriggersUpdate: "yes",
          calledFor: "new props",
          useFor: "respond to props before update",
          receivesContext: "yes"
        }, {
          name: "shouldComponentUpdate",
          setStateTriggersUpdate: "yes",
          calledFor: "new props/state",
          useFor: "performance. return false to skip update",
          receivesContext: "yes"
        }, {
          name: "componentWillUpdate",
          setStateTriggersUpdate: "n/a",
          calledFor: "new props/state",
          useFor: "preparation before update",
          receivesContext: "yes"
        }, {
          name: "componentDidUpdate",
          setStateTriggersUpdate: "yes",
          calledFor: "new props/state",
          useFor: "DOM manipulation after update",
          receivesContext: "no"
        }, {
          name: "componentWillUnmount",
          setStateTriggersUpdate: "n/a",
          calledFor: "unmounting",
          useFor: "cleanup of componentDidMount setup",
          receivesContext: "no"
        } ],
        k = v( [ {
          name: "Lifecycle methods",
          chart: o.a.createElement( ( function () {
            return o.a.createElement( "table", null, o.a.createElement( "thead", null, o.a.createElement( "tr", null, o.a.createElement( "th", null, "name" ), o.a.createElement( "th", null, "called for" ), o.a.createElement( "th", null, "receives context" ), o.a.createElement( "th", null, "setState() triggers an update" ) ) ), o.a.createElement( "tbody", null, T.map( ( function ( e, t ) {
              return o.a.createElement( "tr", {
                key: t
              }, o.a.createElement( "td", {
                "data-label": "name"
              }, e.name ), o.a.createElement( "td", {
                "data-label": "called for"
              }, e.calledFor ), o.a.createElement( "td", {
                "data-label": "receives context"
              }, e.receivesContext ), o.a.createElement( "td", {
                "data-label": "setState() triggers an update"
              }, e.setStateTriggersUpdate ) )
            } ) ) ) )
          } ), null ),
          example: ""
        }, {
          name: "ref (class component)",
          example: "class AutoFocusTextInput extends React.Component {\n  componentDidMount() {\n    this.textInput.focus();\n  }\n\n  render() {\n    return (\n      <CustomTextInput\n        ref={(input) => { this.textInput = input; }} />\n    );\n  }\n}",
          reference: "https://facebook.github.io/react/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component"
        }, {
          name: "ref (functional component)",
          example: 'function CustomTextInput(props) {\n  let textInput = null;\n\n  function handleClick() {\n    textInput.focus();\n  }\n\n  return (\n    <div>\n      <input\n        type="text"\n        ref={(input) => { textInput = input; }} />\n      <input\n        type="button"\n        value="Focus the text input"\n        onClick={handleClick}\n      />\n    </div>\n  );\n}',
          reference: "https://facebook.github.io/react/docs/refs-and-the-dom.html#refs-and-functional-components"
        }, {
          name: "functional component",
          example: "const Greeting = props => <div>Hello {props.name}</div>;",
          reference: "https://facebook.github.io/react/docs/reusable-components.html#stateless-functions",
          module: "react"
        }, {
          name: "functional component (with context)",
          example: 'import { string } from "prop-types";\n\nconst Greeting = (props, context) => (\n  <div>{context.salutation} {props.name}</div>\n);\n\nGreeting.contextTypes = { salutation: string };',
          reference: "https://facebook.github.io/react/docs/reusable-components.html#stateless-functions",
          module: "react"
        } ], {
          category: "misc"
        } ),
        M = [].concat( Object( g.a )( b ), Object( g.a )( y ), Object( g.a )( C ), Object( g.a )( x ), Object( g.a )( j ), Object( g.a )( k ) ),
        S = function ( e ) {
          var t = arguments.length > 1 && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : [];
          return t.length ? Object( u.filter )( e, ( function ( e ) {
            var n = e.category;
            return Object( u.includes )( t, n )
          } ) ) : e
        },
        E = function ( e ) {
          function t() {
            var e, n;
            Object( s.a )( this, t );
            for ( var r = arguments.length, o = new Array( r ), a = 0; a < r; a++ ) o[ a ] = arguments[ a ];
            return ( n = Object( i.a )( this, ( e = Object( m.a )( t ) ).call.apply( e, [ this ].concat( o ) ) ) ).state = {
              predicate: "",
              categories: []
            }, n
          }
          return Object( p.a )( t, e ), Object( l.a )( t, [ {
            key: "render",
            value: function () {
              var e = this,
                t = this.props,
                n = t.children,
                o = t.data,
                a = this.state,
                c = a.categories,
                s = a.predicate;
              return r.Children.only( n( {
                selectedCategories: c,
                filteredResults: Object( u.filter )( S( o, c ), ( function ( e ) {
                  return e.name.match( new RegExp( s, "i" ) )
                } ) ),
                handleCategoryChange: function ( t, n ) {
                  return e.setState( {
                    categories: n ? c.concat( [ t ] ) : Object( u.without )( c, t )
                  } )
                },
                searchPredicate: s,
                handleSearchChange: function ( t ) {
                  return e.setState( {
                    predicate: t
                  } )
                },
                categories: o.reduce( ( function ( e, t ) {
                  var n = t.category;
                  return -1 === e.indexOf( n ) ? e.concat( [ n ] ) : e
                } ), [] )
              } ) )
            }
          } ] ), t
        }( r.Component ),
        w = function ( e ) {
          function t() {
            return Object( s.a )( this, t ), Object( i.a )( this, Object( m.a )( t ).apply( this, arguments ) )
          }
          return Object( p.a )( t, e ), Object( l.a )( t, [ {
            key: "render",
            value: function () {
              var e = this.props,
                t = e.active,
                n = e.name,
                r = e.onToggle;
              return o.a.createElement( "label", {
                className: h()( {
                  marginRight: ".5rem",
                  marginTop: ".5rem",
                  borderRadius: "2px",
                  backgroundColor: t ? "#ffd43b" : "#868e96",
                  fontWeight: "500",
                  color: "#fff",
                  fontSize: "1em",
                  lineHeight: "2em",
                  display: "inline-block",
                  padding: "0 1em",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  userSelect: "none",
                  outline: "none"
                } )
              }, o.a.createElement( "span", {
                className: h()( {
                  color: t ? "#212529" : "#fff"
                } )
              }, n + " " ), o.a.createElement( "input", {
                checked: t,
                className: h()( {
                  marginLeft: ".25em",
                  verticalAlign: "middle",
                  position: "relative",
                  top: "-2px"
                } ),
                onChange: function ( e ) {
                  return r( n, e.target.checked )
                },
                type: "checkbox"
              } ) )
            }
          } ] ), t
        }( r.Component ),
        R = function ( e ) {
          var t = e.name,
            n = e.module,
            r = e.reference,
            a = e.example,
            c = e.chart,
            s = e.playground,
            l = e.notSupported;
          return o.a.createElement( "article", {
            className: h()( {
              paddingTop: "1rem",
              paddingBottom: "1rem",
              borderWidth: 0,
              borderBottomWidth: "1px",
              borderStyle: "solid",
              borderColor: "#dee2e6",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            } )
          }, o.a.createElement( "h2", {
            className: h()( {
              margin: ".5rem 0",
              fontWeight: 800
            } )
          }, t ), o.a.createElement( "div", {
            className: h()( {
              margin: ".5rem 0"
            } )
          }, o.a.createElement( "div", {
            className: h()( {
              float: "right"
            } )
          }, s && o.a.createElement( "a", {
            className: h()( {
              paddingLeft: "1rem",
              ":visited": {
                color: "#1b6ec2"
              }
            } ),
            href: s,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "example" ), r && o.a.createElement( "a", {
            className: h()( {
              paddingLeft: "1rem"
            } ),
            href: r,
            rel: "noopener noreferrer",
            target: "_blank"
          }, "docs" ) ), o.a.createElement( "div", {
            className: h()( {
              fontWeight: 400,
              color: "#6a7884"
            } )
          }, n ) ), a && o.a.createElement( "pre", {
            className: h()( {
              padding: "1rem",
              margin: "1rem 0",
              borderRadius: "2px",
              backgroundColor: "#212529",
              color: "#fff",
              position: "relative",
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "pre"
            } )
          }, o.a.createElement( "code", {
            className: h()( {
              color: "#e9ecef"
            } )
          }, a ) ), c && o.a.createElement( "div", {
            className: h()( {
              margin: "1rem 0"
            } )
          }, c ), l && o.a.createElement( "span", {
            className: h()( {
              fontWeight: 800,
              color: "#e03131"
            } )
          }, o.a.createElement( "strong", null, "\u2716 ".concat( l ) ) ) )
        },
        O = function ( e ) {
          var t = e.handleSearchChange,
            n = e.searchPredicate;
          return o.a.createElement( "label", null, o.a.createElement( "span", {
            className: h()( {
              position: "absolute !important",
              clip: "rect(1px, 1px, 1px, 1px)"
            } )
          }, "Filter Search" ), o.a.createElement( "input", {
            autoFocus: !0,
            placeholder: "Filter by name",
            type: "text",
            className: h()( {
              padding: "1rem",
              width: "100%",
              borderRadius: "2px",
              border: "1px solid #adb5bd",
              color: "#000",
              overflow: "visible",
              margin: 0,
              boxSizing: "border-box"
            } ),
            value: n,
            onChange: function ( e ) {
              return t( e.target.value )
            }
          } ) )
        },
        D = function () {
          return o.a.createElement( "article", {
            className: h()( {
              paddingTop: "8px",
              paddingBottom: "8px"
            } )
          }, o.a.createElement( "h2", {
            className: h()( {
              fontWeight: 800
            } )
          }, "No results" ) )
        },
        U = function ( e ) {
          function t() {
            return Object( s.a )( this, t ), Object( i.a )( this, Object( m.a )( t ).apply( this, arguments ) )
          }
          return Object( p.a )( t, e ), Object( l.a )( t, [ {
            key: "render",
            value: function () {
              return o.a.createElement( "main", {
                className: h()( {
                  fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif",
                  margin: "0 auto",
                  maxWidth: "720px"
                } )
              }, o.a.createElement( "div", {
                className: h()( {
                  padding: "1rem"
                } )
              }, o.a.createElement( "h1", {
                className: h()( {
                  marginBottom: "1rem",
                  color: "#212529",
                  fontWeight: 900,
                  fontSize: "2em"
                } )
              }, "React Cheat Sheet", " ", o.a.createElement( "small", {
                className: h()( {
                  color: "#6a7884",
                  fontSize: ".5em"
                } )
              }, "v16" ) ), o.a.createElement( E, {
                data: M
              }, ( function ( e ) {
                var t = e.categories,
                  n = e.selectedCategories,
                  r = e.filteredResults,
                  a = e.handleCategoryChange,
                  c = e.searchPredicate,
                  s = e.handleSearchChange;
                return o.a.createElement( "div", null, o.a.createElement( O, {
                  searchPredicate: c,
                  handleSearchChange: s
                } ), o.a.createElement( "div", null, t.map( ( function ( e, t ) {
                  return o.a.createElement( w, {
                    active: Object( u.includes )( n, e ),
                    key: t,
                    name: e,
                    onToggle: function ( e, t ) {
                      return a( e, t )
                    }
                  } )
                } ) ) ), o.a.createElement( "section", null, r.length ? r.map( ( function ( e, t ) {
                  return o.a.createElement( R, Object.assign( {
                    key: t
                  }, e ) )
                } ) ) : o.a.createElement( D, null ) ) )
              } ) ), o.a.createElement( "footer", {
                className: h()( {
                  paddingBottom: "1rem",
                  margin: "1rem 0"
                } )
              }, o.a.createElement( "a", {
                href: "https://learnreact.com/courses/function-components?utm_source=reactcheatsheet&utm_medium=ad&utm_campaign=standalone_resources&utm_content=function-components",
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  display: "flex",
                  lineHeight: "1.25",
                  fontSize: "12px",
                  boxSizing: "border-box",
                  marginTop: "16px",
                  width: "320px",
                  maxWidth: "320px",
                  textDecoration: "none",
                  color: "#222"
                }
              }, o.a.createElement( "div", {
                style: {
                  boxSizing: "border-box",
                  border: "1px solid lightgray",
                  overflow: "hidden"
                }
              }, o.a.createElement( "svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 260 200",
                width: "130px",
                height: "100px",
                style: {
                  display: "block"
                }
              }, o.a.createElement( "title", null, "Learn React Ad" ), o.a.createElement( "g", {
                fill: "none",
                fillRule: "evenodd"
              }, o.a.createElement( "path", {
                fill: "#FFF",
                d: "M-12.627 35.646h283.254v148.708H-12.627z"
              } ), o.a.createElement( "path", {
                fill: "#000",
                fillOpacity: ".8",
                d: "M26.738 70V43.45h6.45v20.962h10.274V70H26.737zm31.575-11.475c0-.975-.307-1.812-.92-2.512-.612-.7-1.53-1.05-2.755-1.05-.6 0-1.15.093-1.65.28-.5.188-.938.444-1.313.77-.375.325-.675.706-.9 1.143-.225.438-.35.894-.375 1.37h7.913zm5.662 2.363v.75c0 .25-.012.487-.038.712H50.4c.05.525.206 1 .47 1.425.26.425.6.794 1.01 1.106.414.32.876.56 1.39.74.51.18 1.042.26 1.592.26.976 0 1.8-.18 2.475-.54.676-.36 1.225-.83 1.65-1.4l4.276 2.7c-.876 1.28-2.032 2.26-3.47 2.95-1.437.69-3.105 1.03-5.005 1.03-1.4 0-2.725-.22-3.975-.65-1.25-.44-2.344-1.07-3.282-1.91-.93-.83-1.67-1.86-2.21-3.09-.54-1.22-.8-2.62-.8-4.2 0-1.52.26-2.9.79-4.14.53-1.24 1.24-2.29 2.14-3.15.9-.86 1.96-1.53 3.19-2.01 1.23-.47 2.55-.71 3.98-.71 1.38 0 2.64.23 3.79.7 1.15.46 2.14 1.13 2.96 2.01.83.88 1.47 1.94 1.93 3.19.47 1.25.7 2.68.7 4.28zm14.625.974h-.787c-.676 0-1.357.032-2.044.094-.69.063-1.3.18-1.84.356s-.98.432-1.33.77c-.35.337-.53.78-.53 1.33 0 .35.08.65.24.9.16.25.36.45.62.6.25.15.53.257.86.32.32.062.63.093.94.093 1.25 0 2.2-.344 2.87-1.03.66-.69.99-1.62.99-2.795v-.638zm-11.287-7.987c1.1-1.05 2.38-1.837 3.843-2.362 1.463-.526 2.956-.788 4.48-.788 1.577 0 2.908.194 3.995.58 1.09.39 1.97.99 2.65 1.8.68.814 1.17 1.84 1.48 3.076.32 1.24.47 2.71.47 4.41V70H78.6v-1.987h-.112c-.476.775-1.194 1.374-2.157 1.8-.96.425-2 .637-3.13.637-.75 0-1.52-.1-2.32-.3-.8-.2-1.53-.525-2.19-.975-.66-.45-1.2-1.05-1.63-1.8-.42-.75-.64-1.675-.64-2.775 0-1.35.37-2.437 1.11-3.262.74-.826 1.69-1.463 2.85-1.913 1.16-.45 2.46-.75 3.88-.9 1.43-.15 2.82-.225 4.17-.225V58c0-.925-.32-1.606-.97-2.044-.65-.437-1.45-.656-2.4-.656-.87 0-1.71.187-2.53.563-.81.375-1.5.824-2.08 1.35l-3.11-3.338zm33.6 2.475c-.276-.075-.544-.125-.807-.15-.262-.025-.518-.038-.768-.038-.826 0-1.52.15-2.082.45-.562.3-1.012.663-1.35 1.088-.337.425-.58.887-.73 1.387-.15.5-.226.938-.226 1.313V70H88.8V51.325h5.925v2.7h.075c.475-.95 1.15-1.725 2.025-2.325.875-.6 1.887-.9 3.037-.9.25 0 .494.012.732.038.237.025.43.062.58.112l-.262 5.4zm15 13.65V59.8c0-.525-.044-1.025-.132-1.5-.08-.475-.23-.894-.43-1.256-.2-.363-.48-.65-.84-.863-.36-.21-.82-.31-1.37-.31-.55 0-1.03.11-1.44.32-.41.21-.75.51-1.03.88-.27.38-.48.81-.62 1.3s-.2 1-.2 1.52V70h-6.19V51.325h5.97v2.587h.08c.23-.4.52-.793.88-1.18.36-.388.79-.72 1.28-.995s1.02-.5 1.6-.675c.58-.175 1.19-.262 1.84-.262 1.25 0 2.31.225 3.19.675.88.45 1.58 1.03 2.12 1.744.54.71.93 1.53 1.17 2.45.24.92.36 1.85.36 2.77V70h-6.19zm34.762 0l-5.738-10.538h-2.175V70h-6.3V43.45h10.126c1.275 0 2.518.13 3.73.394 1.213.262 2.3.706 3.263 1.33.97.626 1.74 1.45 2.31 2.476.58 1.025.87 2.3.87 3.825 0 1.8-.48 3.312-1.46 4.538-.97 1.225-2.32 2.1-4.05 2.625L158.18 70h-7.5zm-.263-18.413c0-.625-.13-1.13-.393-1.518-.27-.39-.6-.69-1.02-.9-.41-.22-.88-.36-1.39-.44-.52-.08-1.01-.11-1.49-.11h-3.41v6.19h3.03c.52 0 1.06-.05 1.61-.13.55-.09 1.05-.25 1.5-.47.45-.23.82-.55 1.1-.98.29-.43.43-.98.43-1.65zm22.988 6.938c0-.975-.306-1.812-.92-2.512-.61-.7-1.53-1.05-2.755-1.05-.6 0-1.15.093-1.65.28-.5.188-.937.444-1.313.77-.375.325-.674.706-.9 1.143-.225.438-.35.894-.374 1.37h7.912zm5.662 2.363v.75c0 .25-.012.487-.037.712h-13.537c.05.525.206 1 .468 1.425.263.425.6.794 1.013 1.106.41.32.87.56 1.38.74.51.18 1.04.26 1.59.26.97 0 1.8-.18 2.47-.54.67-.36 1.22-.83 1.65-1.4l4.27 2.7c-.88 1.28-2.03 2.26-3.47 2.95-1.44.69-3.11 1.03-5.01 1.03-1.4 0-2.73-.22-3.98-.65-1.25-.44-2.35-1.07-3.28-1.91-.94-.83-1.68-1.86-2.22-3.09-.53-1.22-.8-2.62-.8-4.2 0-1.52.26-2.9.78-4.14.52-1.24 1.24-2.29 2.14-3.15.9-.86 1.96-1.53 3.18-2.01 1.22-.47 2.55-.71 3.97-.71 1.37 0 2.64.23 3.79.7 1.15.46 2.14 1.13 2.96 2.01.83.88 1.47 1.94 1.93 3.19.46 1.25.7 2.68.7 4.28zm14.625.974h-.787c-.675 0-1.356.032-2.044.094-.687.063-1.3.18-1.837.356-.54.176-.99.432-1.34.77-.35.337-.53.78-.53 1.33 0 .35.08.65.24.9.16.25.37.45.62.6.25.15.53.257.86.32.32.062.64.093.94.093 1.25 0 2.2-.344 2.87-1.03.66-.69.99-1.62.99-2.795v-.638zM182.4 53.875c1.1-1.05 2.38-1.837 3.844-2.362 1.462-.526 2.956-.788 4.48-.788 1.576 0 2.907.194 3.995.58 1.08.39 1.96.99 2.64 1.8.67.814 1.17 1.84 1.48 3.076.31 1.24.47 2.71.47 4.41V70h-5.63v-1.987h-.12c-.48.775-1.2 1.374-2.16 1.8-.97.425-2.01.637-3.13.637-.75 0-1.53-.1-2.33-.3-.8-.2-1.53-.525-2.2-.975-.67-.45-1.21-1.05-1.64-1.8-.43-.75-.64-1.675-.64-2.775 0-1.35.37-2.437 1.1-3.262.73-.826 1.68-1.463 2.85-1.913 1.16-.45 2.45-.75 3.88-.9 1.42-.15 2.81-.225 4.16-.225V58c0-.925-.33-1.606-.98-2.044-.65-.437-1.45-.656-2.4-.656-.88 0-1.72.187-2.53.563-.82.375-1.51.824-2.08 1.35l-3.12-3.338zm34.35 3.487c-.35-.45-.825-.812-1.425-1.087-.6-.275-1.212-.413-1.837-.413-.65 0-1.238.132-1.763.394-.525.263-.975.613-1.35 1.05-.375.438-.67.944-.88 1.52-.214.574-.32 1.186-.32 1.837 0 .65.1 1.262.3 1.837.2.575.494 1.08.88 1.52.39.436.85.78 1.39 1.03.536.25 1.142.375 1.817.375.626 0 1.244-.12 1.857-.356.61-.24 1.1-.59 1.48-1.04l3.41 4.16c-.78.75-1.78 1.33-3 1.76-1.23.42-2.53.63-3.9.63-1.48 0-2.85-.23-4.13-.68-1.28-.45-2.38-1.11-3.32-1.97-.94-.86-1.68-1.91-2.22-3.13-.54-1.23-.81-2.61-.81-4.16 0-1.53.27-2.9.8-4.13.54-1.23 1.27-2.27 2.21-3.13.93-.86 2.04-1.53 3.31-1.99 1.27-.47 2.64-.7 4.09-.7.67 0 1.34.06 2 .19.66.12 1.3.29 1.91.5.61.21 1.18.47 1.69.78.51.31.95.65 1.33 1.03l-3.56 4.13zm12.675-1.425v7.126c0 .875.17 1.53.506 1.968.34.44.95.66 1.82.66.3 0 .62-.02.96-.07.34-.05.62-.12.85-.22l.08 4.5c-.42.15-.96.28-1.61.4-.65.12-1.3.17-1.95.17-1.25 0-2.3-.15-3.15-.47-.85-.31-1.53-.76-2.04-1.35-.51-.58-.88-1.28-1.11-2.1-.22-.81-.33-1.71-.33-2.72v-7.88h-3v-4.61h2.96v-4.92h6.04v4.92h4.39v4.62h-4.38z"
              } ), o.a.createElement( "path", {
                fill: "#FFDE37",
                d: "M128.528 105.46l30.45 60.9h-60.9"
              } ), o.a.createElement( "ellipse", {
                cx: "56.062",
                cy: "136.617",
                fill: "#FF41B4",
                rx: "30.686",
                ry: "30.686"
              } ), o.a.createElement( "path", {
                fill: "#19A974",
                d: "M172.432 105.46h61.372v61.37h-61.372z"
              } ) ) ) ), o.a.createElement( "div", {
                style: {
                  flex: "1",
                  boxSizing: "border-box",
                  marginLeft: "8px"
                }
              }, "Learn all about ", o.a.createElement( "strong", null, "functional components" ), " in a new course by Learn React." ) ) ) ) )
            }
          } ] ), t
        }( r.Component );
      n( 19 ), n( 22 );
      c.a.render( o.a.createElement( U, null ), document.getElementById( "root" ) )
    }
  },
  [
    [ 12, 1, 2 ]
  ]
] );
//# sourceMappingURL=main.ce90bf46.chunk.js.map
