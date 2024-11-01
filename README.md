# Find an address plugin for the GOV.UK Prototype Kit.

A basic [Find an address pattern](https://design-system.dwp.gov.uk/patterns/find-an-address) plugin for prototyping.

## Requirements

The plugin uses the [Ordnance Survey Place API](https://osdatahub.os.uk/docs/places/overview). For it to work you will need to add an API key to your prototype.

1. Request an API key by emailing the Design System Team on [dwp-design-system@engineering.digital.dwp.gov.uk](mailto:dwp-design-system@engineering.digital.dwp.gov.uk).

2. To make your prototype work locally, add the API key to the `.env` file in your prototype (create one in your root folder if there isn't one) like so: `OS_API_KEY=your-api-key`.

3. To deploy the key to your published prototype, set `OS_API_KEY` as an environment variable on your hosting service. The way this works will depend on your hosting service: on Heroku you can [use the command line, the dashboard or the platform API](https://devcenter.heroku.com/articles/config-vars#managing-config-vars).

## Using the plugin with the GOV.UK prototype kit

### 1. Install the plugin

Install the plugin by running the following command in your terminal:

`npm i https://github.com/dwp/find-an-address-plugin.git`

### 2. Add the following code to your prototype's `app/routes.js` file:

```
const findAddressPlugin = require("@dwp/find-an-address-plugin");

findAddressPlugin(router);
```

### 3. Add the Find an address pattern to your prototype

On the page before you want the pattern to appear, call the plugin as follows: in this example the user sees the address search after selecting a "Continue" button.

```

{# Example of a Continue button #}
{{
    govukButton({
        text: "Continue",
        href: "/dwp-find-an-address-plugin/start?find_an_address_exit_url=/your-exit-url",
        isStartButton: false
    })
}}
```

Set the `find_an_address_exit_url` to the URL of the first page after the address finder. (See [Use links to set data](https://prototype-kit.service.gov.uk/docs/pass-data#use-links-to-set-data) for more about how this works.) 

### 4. Use the stored address elsewhere in your prototype

The confirmed address is stored in the prototype session with an object called `address`. You can access it in the [same way you do for other session data](https://prototype-kit.service.gov.uk/docs/session#accessing-fields-from-the-session), using `{{ data.address }}` or `{{ data['address'] }}`.

The stored address will be cleared (along with any other stored session data) by the "Clear data" link in the prototype footer.
