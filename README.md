# Find an address plugin for the GOV.UK Prototype Kit

A basic address finder plugin for use with the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/docs/).

This plugin allows you to insert the full [DWP Find an address pattern](https://design-system.dwp.gov.uk/patterns/find-an-address) into a prototype without having to code individual pages or routes. It includes pages, routes and logic for storing an address in the prototype session.

## Requirements

To use this plugin you will need the GOV.UK Prototype Kit version 13 or later.

The plugin uses the [Ordnance Survey Place API](https://osdatahub.os.uk/docs/places/overview). For it to work you will need to add an API key to your prototype.

1. Request an API key by emailing the Design System Team on [dwp-design-system@engineering.digital.dwp.gov.uk](mailto:dwp-design-system@engineering.digital.dwp.gov.uk).

2. To make your prototype work locally, add the API key to the `.env` file in your prototype like so: `OS_API_KEY=your-api-key`. If your prototype doesn't have a `.env` file, create one that just contains this text and save it in the prototype's root folder.

>[!CAUTION]
>To avoid publishing API keys to a public repository, your `.env` file must remain local and should never be included in any commit.

3. To deploy the key to your published prototype, set `OS_API_KEY` as an environment variable on your hosting service. The way this works will depend on your hosting service: on Heroku you can [use the command line, the dashboard or the platform API](https://devcenter.heroku.com/articles/config-vars#managing-config-vars).

## Using the plugin with the GOV.UK Prototype Kit

These instructions assume you have already started a prototype by installing the GOV.UK Prototype Kit. If not, do that first.

### 1. Install the plugin

In the folder that contains your prototype, install the plugin by running the following terminal command:

`npm i https://github.com/dwp/find-an-address-plugin.git`

### 2. Add the following code to your prototype's `app/routes.js` file

```

const findAddressPlugin = require("find-an-address-plugin");

findAddressPlugin(router);
```

### 3. Add the Find an address pattern to your prototype

Link to the plugin from any page in your prototype as shown below. In this example the link is a "Continue" button.

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

This link also controls what happens after the user successfully confirms an address. Replace `/your-exit-url` with the URL of the page that should appear after the address confirmation page.

(See [Use links to set data](https://prototype-kit.service.gov.uk/docs/pass-data#use-links-to-set-data) for more about how this works.)

### 4. Use the stored address elsewhere in your prototype

The confirmed address is stored in the prototype session with an object called `address`. You can access it in the [same way you do for other session data](https://prototype-kit.service.gov.uk/docs/session#accessing-fields-from-the-session), using `{{ data.address }}` or `{{ data['address'] }}`.

The stored address will be cleared (along with any other stored session data) by the "Clear data" link in the prototype footer.
