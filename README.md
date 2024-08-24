# AuthAlert

## Features

AuthAlert instantly identifies new devices accessing user accounts and sends alerts via API, email, or webhook, enhancing security and building trust. This package is designed to be used with JavaScript frontends such as React, Vue.js, Angular, and others.

- Detect new devices used by your users
- Respond to your frontend to trigger MFA only for new devices
- Send email alerts to your users via Mailgun
- Trigger webhooks to automate processes in your systems
- Simple to implement and scale

## Installation

To install the package, use the following command:

```bash
npm install authalert
```

## Using the API

The API can be used as a Promise or an async function.

### Async Function Example

```jsx
import AuthAlertAPI from 'authalert';

const projectId = "your_project_ID";

const result = await AuthAlertAPI(projectId, {
  user_id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name
});

console.log(result);
```

### Promise Example

```jsx
import AuthAlertAPI from 'authalert';

const projectId = "your_project_ID";

AuthAlertAPI(projectId, {
  user_id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name
}).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
});
```

To obtain `your_project_ID`, visit [AuthAlert](https://www.authalert.io/) and create a project. The API supports the following input variables to populate user data:

| Name | Example | Description | Required |
| --- | --- | --- | --- |
| user_id | "ac5c7322" | A unique ID to identify the user. | Required |
| email | "[john.smith@test.com](mailto:john.smith@test.com)" | The user's email address, used for sending alert emails. | Optional |
| first_name | "John" | The user's first name, used in alert emails. | Optional |
| last_name | "Smith" | The user's last name, used in alert emails. | Optional |

## Authentication

To use the AuthAlert API in your frontend, you must add the domain names of your websites or web apps to the authorized domain list. Unauthorized API requests will result in 403 errors. You can manage your authorized domains in [the AuthAlert platform here](https://app.authalert.io/).

## API Response

When the API is successfully called, it checks whether the user is new to the system and if the device is new to the user. The API then responds in the following format:

```json
{
  "new_user": false,
  "new_device": true
}
```

To use the API for triggering MFA, redirect users to the MFA route when "new_device" is `true`. This approach triggers MFA only when users authenticate on new devices. You can also combine this with a "remember me" checkbox to give users the option to skip MFA on specific devices.

## Mailgun Integration

The Mailgun integration allows you to enable email alerts without writing code when new devices are detected. To activate the integration, toggle the option in your AuthAlert project settings, then enter the domain, API key, sender email, subject line, and template name. You will need to create a template in your Mailgun account. The template can use the following variables:

| Name | Example | Description |
| --- | --- | --- |
| first_name | "John" | The user's first name. |
| last_name | "Smith" | The user's last name. |
| new_device_os | "Mac OS X" | The new device's operating system. |
| new_device_os_version | "10" | The new device's operating system version. |
| new_device_browser | "Firefox" | The new device's browser. |
| new_device_browser_version | "128" | The new device's browser version. |
| new_device_device_brand | "Apple" | The new device's brand. |
| new_device_country | "AU" | The country code where the device is located. |
| new_device_region | "NSW" | The state or province where the device is located. |
| new_device_city | "Sydney" | The city or metro area where the device is located. |

## Webhook Integration

The webhook integration enables programmatic interactions, such as integrating with CRM systems or communication channels beyond Mailgun. To enable the integration, toggle the option in your AuthAlert project settings, then enter the webhook URL and secret. When a new device is detected, AuthAlert will send the following JSON payload to the webhook URL:

```json
{
  "user_id": "HZkj3L8we0gZjnHlrxziA53e1TH2",
  "email": "",
  "first_name": "",
  "last_name": "",
  "device_id": "6uex31zf1tx",
  "subscription_id": "q9enh4fcvjmPDDVR1mNT",
  "new_device": {
    "device_id": "6uex31zf1tx",
    "os": "Mac OS X",
    "os_version": "10",
    "browser": "Firefox",
    "browser_version": "128",
    "device_brand": "Apple",
    "device_model": "Mac",
    "device_family": "Mac",
    "country": "AU",
    "region": "NSW",
    "city": "Sydney",
    "city_lat_long": "-33.868820,151.209295"
  }
}
```