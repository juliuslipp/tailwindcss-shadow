# TailwindCSS Shadow Plugin

A plugin to extend TailwindCSS's functionality with a rich set of text-shadow, box-shadow, and drop-shadow utilities.

## Features

- Supports multiple shadow styles such as normal, mirror, inset, outline, and more
- Configurable via Tailwind's theme
- Supports dynamic values for text shadow
## Credits

Originally inspired by [DesignByCode/tailwindcss-text-shadow](https://github.com/DesignByCode/tailwindcss-text-shadow)

## Installation

```bash
npm install --save tailwindcss-shadow
```

## Usage

1. Add the plugin to your `tailwind.config.js`:

```js
module.exports = {
  plugins: [
    require('tailwindcss-shadow')
  ],
}
```

2. Add the configuration in the `theme`:

```js
module.exports = {
  theme: {
    textShadowSteps: {
			
      // Your steps here
    },
    dropShadowSteps: {
		(mulitplier) => myDropShadow * mulitplier
      // Your steps here
    },
    shadowSteps: {
      // Your steps here
    },
  },
}
```

## Classes

Here are some classes that you can use:

- `text-shadow`: Adds a default text shadow.
- `text-shadow-x-1px`, `text-shadow-y-2px`, `text-shadow-blur-3px`: Dynamic values for text shadow.
- `shadow-normal`, `shadow-mirror-left`, `shadow-inset`, `drop-shadow-normal`, `drop-shadow-equal`: Variants of shadows. (Those are applying the shadow directive)
- `shadow-normal`, `shadow-x-2`, `shadow-y-2`, `shadow-blur-2`, `shadow-color-red-500`: Dynamic values for shadows. (Those are applying the shadow variables)
- `drop-shadow-normal`, `drop-shadow-mirror-left`, `drop-shadow-inset`...
- `drop-shadow-x-2`, `drop-shadow-y-2`, `drop-shadow-blur-2`, `drop-shadow-color-red-500`...

## Customization

You can customize the steps and variants through the `theme` section in your `tailwind.config.js`.

## Example

```html
<div class="text-shadow inset-shadow-normal drop-shadow-normal">
  This text has multiple shadows!
</div>
```

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request.

## License

MIT

---

Feel free to modify the README according to the specifics of your plugin.