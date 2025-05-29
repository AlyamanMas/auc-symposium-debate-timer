Title: react-countdown

URL Source: http://www.npmjs.com/package/react-countdown

Markdown Content:
A customizable countdown component for React.

*   [Getting Started](http://www.npmjs.com/package/react-countdown#getting-started)
*   [Motivation](http://www.npmjs.com/package/react-countdown#motivation)
*   [Examples](http://www.npmjs.com/package/react-countdown#examples)
*   [Props](http://www.npmjs.com/package/react-countdown#props)
*   [API Reference](http://www.npmjs.com/package/react-countdown#api-reference)
*   [Helpers](http://www.npmjs.com/package/react-countdown#helpers)
*   [FAQ](http://www.npmjs.com/package/react-countdown#faq)
*   [Contributing](http://www.npmjs.com/package/react-countdown#contributing)
*   [License](http://www.npmjs.com/package/react-countdown#license)

You can install the module via `npm` or `yarn`:

npm install react-countdown --save

yarn add react-countdown

As part of a small web app at first, the idea was to separate the countdown component from the main package to combine general aspects of the development with React, testing with Jest and more things that relate to publishing a new Open Source project.

Here are some examples which you can try directly online. You can also clone this repo and explore some more examples in there by running `yarn start` within the `examples` folder.

A very simple and minimal example of how to set up a countdown that counts down from 10 seconds.

import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

ReactDOM.render(
  <Countdown date={Date.now() + 10000} />,
  document.getElementById('root')
);

[Live Demo](https://codesandbox.io/s/cool-fermat-uk0dq)

In case you want to change the output of the component or want to signal that the countdown's work is done, you can do this by either using the [`onComplete`](http://www.npmjs.com/package/react-countdown#oncomplete) callback, a custom [`renderer`](http://www.npmjs.com/package/react-countdown#renderer), or by specifying a React child within `<Countdown></Countdown>`, which will only be shown once the countdown is complete.

import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

// Random component
const Completionist = () => <span>You are good to go!</span>;

ReactDOM.render(
  (
    <Countdown date={Date.now() + 5000}>
      <Completionist />
    </Countdown>
  ),
  document.getElementById('root')
);

[Live Demo](https://codesandbox.io/s/condescending-bartik-kyp2v)

import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

ReactDOM.render(
  <Countdown
    date={Date.now() + 5000}
    renderer={renderer}
  />,
  document.getElementById('root')
);

[Live Demo](https://codesandbox.io/s/sad-zhukovsky-hs7hc)

Here is an example with a countdown of 10 seconds that displays the total time difference in milliseconds. In order to display the milliseconds appropriately, the [`intervalDelay`](http://www.npmjs.com/package/react-countdown#intervaldelay) value needs to be lower than `1000`ms and a [`precision`](http://www.npmjs.com/package/react-countdown#precision) of `1` to `3` should be used. Last but not least, a simple [`renderer`](http://www.npmjs.com/package/react-countdown#renderer) callback needs to be set up.

import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

ReactDOM.render(
  <Countdown
    date={Date.now() + 10000}
    intervalDelay={0}
    precision={3}
    renderer={props => <div>{props.total}</div>}
  />,
  document.getElementById('root')
);

[Live Demo](https://codesandbox.io/s/elastic-euclid-6vnlw)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [**date**](http://www.npmjs.com/package/react-countdown#date) | `Date|string|number` | required | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) or timestamp in the future |
| [**key**](http://www.npmjs.com/package/react-countdown#key) | `string|number` | `undefined` | React [`key`](https://reactjs.org/docs/lists-and-keys.html#keys); can be used to restart the countdown |
| [**daysInHours**](http://www.npmjs.com/package/react-countdown#daysinhours) | `boolean` | `false` | Days are calculated as hours |
| [**zeroPadTime**](http://www.npmjs.com/package/react-countdown#zeropadtime) | `number` | `2` | Length of zero-padded output, e.g.: `00:01:02` |
| [**zeroPadDays**](http://www.npmjs.com/package/react-countdown#zeropaddays) | `number` | `zeroPadTime` | Length of zero-padded days output, e.g.: `01` |
| [**controlled**](http://www.npmjs.com/package/react-countdown#controlled) | `boolean` | `false` | Hands over the control to its parent(s) |
| [**intervalDelay**](http://www.npmjs.com/package/react-countdown#intervaldelay) | `number` | `1000` | Interval delay in milliseconds |
| [**precision**](http://www.npmjs.com/package/react-countdown#precision) | `number` | `0` | The precision on a millisecond basis |
| [**autoStart**](http://www.npmjs.com/package/react-countdown#autostart) | `boolean` | `true` | Countdown auto-start option |
| [**overtime**](http://www.npmjs.com/package/react-countdown#overtime) | `boolean` | `false` | Counts down to infinity |
| [**children**](http://www.npmjs.com/package/react-countdown#children) | `any` | `null` | A React child for the countdown's completed state |
| [**renderer**](http://www.npmjs.com/package/react-countdown#renderer) | `function` | `undefined` | Custom renderer callback |
| [**now**](http://www.npmjs.com/package/react-countdown#now) | `function` | `Date.now` | Alternative handler for the current date |
| [**onMount**](http://www.npmjs.com/package/react-countdown#onmount) | `function` | `undefined` | Callback when component mounts |
| [**onStart**](http://www.npmjs.com/package/react-countdown#onstart) | `function` | `undefined` | Callback when countdown starts |
| [**onPause**](http://www.npmjs.com/package/react-countdown#onpause) | `function` | `undefined` | Callback when countdown pauses |
| [**onStop**](http://www.npmjs.com/package/react-countdown#onstop) | `function` | `undefined` | Callback when countdown stops |
| [**onTick**](http://www.npmjs.com/package/react-countdown#ontick) | `function` | `undefined` | Callback on every interval tick (`controlled` = `false`) |
| [**onComplete**](http://www.npmjs.com/package/react-countdown#oncomplete) | `function` | `undefined` | Callback when countdown ends |

The `date` prop is the only required one and can be a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object, `string`, or timestamp in the future. By default, this date is compared with the current date, or a custom handler defined via [`now`](http://www.npmjs.com/package/react-countdown#now).

Valid values can be _(and more)_:

*   `'2020-02-01T01:02:03'` // [`Date` time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format)
*   `1580518923000` // Timestamp in milliseconds
*   `new Date(1580518923000)` // [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object

This is one of React's internal component props to help identify elements throughout the reconciliation process. It can be used to restart the countdown by passing in a new `string` or `number` value.

Please see [official React docs](https://reactjs.org/docs/lists-and-keys.html#keys) for more information about keys.

Defines whether the time of day should be calculated as hours rather than separated days.

Can be useful if the countdown's interval and/or date control should be handed over to the parent. In case `controlled` is `true`, the provided [`date`](http://www.npmjs.com/package/react-countdown#date) will be treated as the countdown's actual time difference and not be compared to [`now`](http://www.npmjs.com/package/react-countdown#now) anymore.

This option defaults to `2` in order to display the common format `00:00:00` instead of `0:0:0`. If the value is higher than `2`, only the hours part _(see [`zeroPadDays`](http://www.npmjs.com/package/react-countdown#zeropaddays) for days)_ will be zero-padded while it stays at `2` for minutes as well as seconds. If the value is lower, the output won't be zero-padded like the example before is showing.

Defaults to `zeroPadTime`. It works the same way as [`zeroPadTime`](http://www.npmjs.com/package/react-countdown#zeropadtime) does, just for days.

Since this countdown is based on date comparisons, the default value of `1000` milliseconds is probably enough for most scenarios and doesn't need to be changed.

However, if it needs to be more precise, the `intervalDelay` can be set to something lower - down to `0`, which would, for example, allow showing the milliseconds in a more fancy way (_currently_ only possible through a custom [`renderer`](http://www.npmjs.com/package/react-countdown#renderer)).

In certain cases, you might want to base off the calculations on a millisecond basis. The `precision` prop, which defaults to `0`, can be used to refine this calculation. While the default value simply strips the milliseconds part (e.g., `10123`ms =>`10000`ms), a precision of `3` leads to `10123`ms.

Defines whether the countdown should start automatically or not. Defaults to `true`.

Defines whether the countdown can go into overtime by extending its lifetime past the targeted endpoint. Defaults to `false`.

When set to `true`, the countdown timer won't stop when hitting 0, but instead becomes negative and continues to run unless paused/stopped. The [`onComplete`](http://www.npmjs.com/package/react-countdown#oncomplete) callback would still get triggered when the initial countdown phase completes.

> Please note that the [`children`](http://www.npmjs.com/package/react-countdown#children) prop will be ignored if `overtime` is `true`. Also, when using a custom [`renderer`](http://www.npmjs.com/package/react-countdown#renderer), you'll have to check one of the [render props](http://www.npmjs.com/package/react-countdown#render-props), e.g., `total`, or `completed`, to render the overtime output.

This component also considers the child that may live within the `<Countdown></Countdown>` element, which, in case it's available, replaces the countdown's component state once it's complete. Moreover, an additional prop called `countdown` is set and contains data similar to what the [`renderer`](http://www.npmjs.com/package/react-countdown#renderer) callback would receive. Here's an [example](http://www.npmjs.com/package/react-countdown#using-a-react-child-for-the-completed-state) that showcases its usage.

> Please note that the [`children`](http://www.npmjs.com/package/react-countdown#children) prop will be ignored if a custom [`renderer`](http://www.npmjs.com/package/react-countdown#renderer) is defined.

The component's raw render output is kept very simple.

For more advanced countdown displays, a custom `renderer` callback can be defined to return a new React element. It receives the following [render props](http://www.npmjs.com/package/react-countdown#render-props) as the first argument.

The render props object consists of the current time delta object, the countdown's [`api`](http://www.npmjs.com/package/react-countdown#api-reference), the component [`props`](http://www.npmjs.com/package/react-countdown#props), and last but not least, a [`formatted`](http://www.npmjs.com/package/react-countdown#formattimedelta) object.

{
  total: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  completed: true,
  api: { ... },
  props: { ... },
  formatted: { ... }
}

> Please note that a defined custom [`renderer`](http://www.npmjs.com/package/react-countdown#renderer) will ignore the [`children`](http://www.npmjs.com/package/react-countdown#children) prop.

If the current date and time (determined via a reference to `Date.now`) is not the right thing to compare with for you, a reference to a custom function that returns a similar dynamic value could be provided as an alternative.

`onMount` is a callback and triggered when the countdown mounts. It receives a [time delta object](http://www.npmjs.com/package/react-countdown#calctimedelta) as the first argument.

`onStart` is a callback and triggered whenever the countdown is started (including first-run). It receives a [time delta object](http://www.npmjs.com/package/react-countdown#calctimedelta) as the first argument.

`onPause` is a callback and triggered every time the countdown is paused. It receives a [time delta object](http://www.npmjs.com/package/react-countdown#calctimedelta) as the first argument.

`onStop` is a callback and triggered every time the countdown is stopped. It receives a [time delta object](http://www.npmjs.com/package/react-countdown#calctimedelta) as the first argument.

`onTick` is a callback and triggered every time a new period is started, based on what the [`intervalDelay`](http://www.npmjs.com/package/react-countdown#intervaldelay)'s value is. It only gets triggered when the countdown's [`controlled`](http://www.npmjs.com/package/react-countdown#controlled) prop is set to `false`, meaning that the countdown has full control over its interval. It receives a [time delta object](http://www.npmjs.com/package/react-countdown#calctimedelta) as the first argument.

`onComplete` is a callback and triggered whenever the countdown ends. In contrast to [`onTick`](http://www.npmjs.com/package/react-countdown#ontick), the [`onComplete`](http://www.npmjs.com/package/react-countdown#oncomplete) callback also gets triggered in case [`controlled`](http://www.npmjs.com/package/react-countdown#controlled) is set to `true`. It receives a [time delta object](http://www.npmjs.com/package/react-countdown#calctimedelta) as the first argument and a `boolean` as a second argument, indicating whether the countdown transitioned into the completed state (`false`) or completed on start (`true`).

The countdown component exposes a simple API through the `getApi()` function that can be accessed via component `ref`. It is also part (`api`) of the [render props](http://www.npmjs.com/package/react-countdown#render-props) passed into [`renderer`](http://www.npmjs.com/package/react-countdown#renderer) if needed. Here's an [example](https://github.com/ndresx/react-countdown/blob/master/examples/src/CountdownApi.tsx) of how to use it.

Starts the countdown in case it is paused/stopped or needed when [`autoStart`](http://www.npmjs.com/package/react-countdown#autostart) is set to `false`.

Pauses the running countdown. This only works as expected if the [`controlled`](http://www.npmjs.com/package/react-countdown#controlled) prop is set to `false` because [`calcTimeDelta`](http://www.npmjs.com/package/react-countdown#calctimedelta) calculates an offset time internally.

Stops the countdown. This only works as expected if the [`controlled`](http://www.npmjs.com/package/react-countdown#controlled) prop is set to `false` because [`calcTimeDelta`](http://www.npmjs.com/package/react-countdown#calctimedelta) calculates an offset time internally.

Returns a `boolean` for whether the countdown has been paused or not.

Returns a `boolean` for whether the countdown has been stopped or not.

Returns a `boolean` for whether the countdown has been completed or not.

> Please note that this will always return `false` if [`overtime`](http://www.npmjs.com/package/react-countdown#overtime) is `true`. Nevertheless, an into overtime running countdown's completed state can still be looking at the time delta object's `completed` value.

This module also exports three simple helper functions, which can be utilized to build your own countdown custom [`renderer`](http://www.npmjs.com/package/react-countdown#renderer).

import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';

The `zeroPad` function transforms and returns a given `value` with padded zeros depending on the `length`. The `value` can be a `string` or `number`, while the `length` parameter can be a `number`, defaulting to `2`. Returns the zero-padded `string`, e.g., `zeroPad(5)` =>`05`.

const renderer = ({ hours, minutes, seconds }) => (
  <span>
    {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);

`calcTimeDelta` calculates the time difference between a given end [`date`](http://www.npmjs.com/package/react-countdown#date) and the current date (`now`). It returns, similar to the [`renderer`](http://www.npmjs.com/package/react-countdown#renderer) callback, a custom object (also referred to as **countdown time delta object**) with the following time-related data:

{ total, days, hours, minutes, seconds, milliseconds, completed }

The `total` value is the absolute time difference in milliseconds, whereas the other time-related values contain their relative portion of the current time difference. The `completed` value signalizes whether the countdown reached its initial end or not.

The `calcTimeDelta` function accepts two arguments in total; only the first one is required.

**`date`** Date or timestamp representation of the end date. See [`date`](http://www.npmjs.com/package/react-countdown#date) prop for more details.

**`options`** The second argument consists of the following optional keys.

*   **`now = Date.now`** Alternative function for returning the current date, also see [`now`](http://www.npmjs.com/package/react-countdown#now).

*   **`precision = 0`** The [`precision`](http://www.npmjs.com/package/react-countdown#precision) on a millisecond basis.

*   **`controlled = false`** Defines whether the calculated value is provided in a [`controlled`](http://www.npmjs.com/package/react-countdown#controlled) environment as the time difference or not.

*   **`offsetTime = 0`** Defines the offset time that gets added to the start time; only considered if controlled is false.

*   **`overtime = false`** Defines whether the time delta can go into [`overtime`](http://www.npmjs.com/package/react-countdown#overtime) and become negative or not. When set to `true`, the `total` could become negative, at which point `completed` will still be set to `true`.

`formatTimeDelta` formats a given countdown time delta object. It returns the formatted portion of it, equivalent to:

{
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
}

This function accepts two arguments in total; only the first one is required.

**`timeDelta`** Time delta object, e.g., returned by [`calcTimeDelta`](http://www.npmjs.com/package/react-countdown#calctimedelta).

**`options`** The `options` object consists of the following three component props and is used to customize the time delta object's formatting:

*   [`daysInHours`](http://www.npmjs.com/package/react-countdown#daysinhours)
*   [`zeroPadTime`](http://www.npmjs.com/package/react-countdown#zeropadtime)
*   [`zeroPadDays`](http://www.npmjs.com/package/react-countdown#zeropaddays)

A common reason for this is that the [`date`](http://www.npmjs.com/package/react-countdown#date) prop gets passed directly into the component without persisting it in any way.

In order to avoid this from happening, it should be stored in a place that persists throughout lifecycle changes, for example, in the component's local `state`.

The [`renderer`](http://www.npmjs.com/package/react-countdown#renderer) callback gets called with a [time delta object](http://www.npmjs.com/package/react-countdown#calctimedelta) that also consists of a `formatted` object which holds these formatted values.

This could have something to do with server-side rendering and that the countdown already runs on the server-side, resulting in a timestamp discrepancy between the client and the server. In this case, it might be worth checking [https://reactjs.org/docs/dom-elements.html#suppresshydrationwarning](https://reactjs.org/docs/dom-elements.html#suppresshydrationwarning).

Alternatively, you could try to set [`autoStart`](http://www.npmjs.com/package/react-countdown#autostart) to `false` and start the countdown through the [API](http://www.npmjs.com/package/react-countdown#api-reference) once it's available on the client. Here are some related [issues](https://github.com/ndresx/react-countdown/issues/152) that might help in fixing this problem.

Contributions of any kind are very welcome. Read more in our [contributing guide](https://github.com/ndresx/react-countdown/blob/master/CONTRIBUTING.md) about how to report bugs, create pull requests, and other development-related topics.

MIT
