/** Credits: https://github.com/DesignByCode/tailwindcss-text-shadow **/

// @ts-ignore
import plugin from "tailwindcss/plugin"
// @ts-ignore
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"

function generateTextShadow(steps: number = 1) {
	let classes = []
	for (let x = 0; x < steps; x++) {
		classes.push(
			`calc(var(--ts-text-shadow-x) * ${x}) calc(var(--ts-text-shadow-y) * ${x}) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`,
		)
	}
	return classes.toString()
}

interface StepProps {
	[key: string]: string
}

const createShadowVariants = (
	name: string,
	x: string,
	y: string,
	blur: string,
	color: string,
): {
	[key: string]: (multiplier: number) => string
} => ({
	[`${name}-normal`]: (multiplier) =>
		`calc(${multiplier} * ${x}) calc(${multiplier} * ${y}) calc(${multiplier} * ${blur}) ${color}`,
	[`${name}-multi-plied`]: (multiplier) => [...Array(multiplier).keys()].map((i) => `calc(${x} * ${i}) calc(${y} * ${i}) calc(${blur} * ${i}) ${color}`).join(" "),
	[`${name}-multi`]: (multiplier) => [...Array(multiplier).keys()].map((i) => `calc(${x}) calc(${y}) calc(${blur}) ${color}`).join(" "),
	[`${name}-equal`]: (multiplier) =>
		`0px 0px calc(${multiplier} * ${blur}) ${color}`,
	[`${name}-mirror-left`]: (multiplier) =>
		`-calc(${multiplier} * ${x}) 0px calc(${blur} * 2 * ${multiplier}) ${color}`,
	[`${name}-mirror-right`]: (multiplier) =>
		`calc(${multiplier} * ${x}) 0px calc(${blur} * 2 * ${multiplier}) ${color}`,
	[`${name}-mirror-top`]: (multiplier) =>
		`0px -calc(${multiplier} * ${y}) calc(${blur} * 2 * ${multiplier}) ${color}`,
	[`${name}-mirror-bottom`]: (multiplier) =>
		`0px calc(${multiplier} * ${y}) calc(${blur} * 2 * ${multiplier}) ${color}`,
	[`${name}-inset`]: (multiplier) => `inset calc(${multiplier} * ${x}) calc(${multiplier} * ${y}) calc(${blur} * ${multiplier}) ${color}`,
	[`${name}-outline`]: (multiplier) =>
		`0px 0px 0px calc(${blur} * 3 * ${multiplier}) ${color}`,
	[`${name}-soft`]: (multiplier) =>
		`0px calc(${multiplier} * ${y}) calc(${blur} * 4 * ${multiplier}) ${color}`,
	[`${name}-hard`]: (multiplier) =>
		`0px calc(${multiplier} * ${y}) calc(${multiplier} * ${blur}) ${color}`,
	[`${name}-double`]: (multiplier) =>
		`0px calc(${multiplier} * ${y}) calc(${multiplier} * ${blur}) ${color}, 0px calc(${multiplier} * ${y} * 2) calc(${multiplier} * ${blur}) ${color}`,
	[`${name}-hover`]: (multiplier) =>
		`0px calc(${multiplier} * ${y} * 2) calc(${blur} * 4 * ${multiplier}) ${color}`,
	[`${name}-press`]: (multiplier) =>
		`0px calc(${multiplier} * ${y}) calc(${multiplier} * ${blur}) ${color}`,
})

const SHADOW_VARIANTS = createShadowVariants(
	"shadow",
	"var(--ts-shadow-x)",
	"var(--ts-shadow-y)",
	"var(--ts-shadow-blur)",
	"var(--tw-shadow-color)",
)

const DROP_SHADOW_VARIANTS = createShadowVariants(
	"drop-shadow",
	"var(--ts-drop-shadow-x)",
	"var(--ts-drop-shadow-y)",
	"var(--ts-drop-shadow-blur)",
	"var(--ts-drop-shadow-color)",
)
Object.keys(DROP_SHADOW_VARIANTS).forEach((variant) => {
	if (variant.includes("inset")) {
		delete DROP_SHADOW_VARIANTS[variant];
	}
});
const steps = Object.assign({}, [...Array(100).keys()].map((i) => `${i}px`))

export default plugin(
	function({
						 addBase,
						 addComponents,
						 matchUtilities,
						 matchComponents,
						 theme,
					 }: any): void {
		const flatColorPalette = flattenColorPalette(theme("colors"))
		const dropShadowVariants: Record<string, (val: number) => string> = theme("dropShadowVariants")
		const shadowVariants: Record<string, (val: number) => string> = theme("shadowVariants")
		addBase({
			":root": {
				"--ts-text-shadow-color": "rgba(0, 0,0,0.45)",
				"--ts-text-shadow-x": "1px",
				"--ts-text-shadow-y": "1px",
				"--ts-text-shadow-blur": "2px",
				"--ts-drop-shadow-color": "rgba(0, 0,0,0.45)",
				"--ts-drop-shadow-x": "1px",
				"--ts-drop-shadow-y": "1px",
				"--ts-drop-shadow-blur": "2px",
				"--ts-shadow-x": "1px",
				"--ts-shadow-y": "1px",
				"--ts-shadow-blur": "2px",
			},
		})

		addComponents({
			".text-shadow": {
				textShadow: `var(--ts-text-shadow-x) var(--ts-text-shadow-y) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`,
			},
			...Object.entries(shadowVariants).reduce(
				(acc, [key, value]) => ({
					...acc,
					[`.${key}`]: {
						boxShadow: value(1),
					},
				}),
				{},
			),
			...Object.entries(dropShadowVariants).reduce(
				(acc, [key, value]) => ({
					...acc,
					[`.${key}`]: {
						filter: `drop-shadow(${value(1)})`,
					},
				}),
				{},
			),
		})

		matchUtilities(
			{
				"text-shadow-x": (value: StepProps) => ({
					"--ts-text-shadow-x": value,
				}),
				"text-shadow-y": (value: StepProps) => ({
					"--ts-text-shadow-y": value,
				}),
				"text-shadow-blur": (value: StepProps) => ({
					"--ts-text-shadow-blur": value,
				}),
			},
			{
				values: {
					...steps,
					...theme("textShadowSteps"),
				},
				type: "length",
				supportsNegativeValues: true,
			},
		)

		matchUtilities(
			{
				"shadow-x": (value: StepProps) => ({
					"--ts-shadow-x": value,
				}),
				"shadow-y": (value: StepProps) => ({
					"--ts-shadow-y": value,
				}),
				"shadow-blur": (value: StepProps) => ({
					"--ts-shadow-blur": value,
				}),
			},
			{
				values: {
					...steps,
					...theme("shadowSteps"),
				},
				type: "length",
				supportsNegativeValues: true,
			},
		)

		matchUtilities(
			{
				"drop-shadow-x": (value: StepProps) => ({
					"--ts-drop-shadow-x": value,
				}),
				"drop-shadow-y": (value: StepProps) => ({
					"--ts-drop-shadow-y": value,
				}),
				"drop-shadow-blur": (value: StepProps) => ({
					"--ts-drop-shadow-blur": value,
				}),
			},
			{
				values: {
					...steps,
					...theme("dropShadowSteps"),
				},
				type: "length",
				supportsNegativeValues: true,
			},
		)

		matchUtilities(
			{
				"text-shadow": (value: StepProps) => ({
					"--ts-text-shadow-color": value,
				}),
				"drop-shadow": (value: StepProps) => ({
					"--ts-drop-shadow-color": value,
				}),
			},
			{
				values: flatColorPalette,
				type: "color",
			},
		)

		matchComponents(
			{
				"text-shadow": (value: number) => ({
					textShadow: generateTextShadow(value),
				}),
			},
			{
				type: "number",
				values: Object.entries(theme("textShadowSteps")).reduce(
					(acc, [key, value]) => ({
						...acc,
						[key]: Number(String(value).replace("px", "")),
					}),
					{},
				),
			},
		)

		matchComponents(
			{
				...Object.entries(dropShadowVariants).reduce(
					(acc, [key, value]) => ({
						...acc,
						[key]: (val: number) => ({
							filter: `drop-shadow(${value(val)})`,
						}),
					}),
					{},
				),
			},
			{
				type: "number",
				values: Object.entries(theme("dropShadowSteps")).reduce(
					(acc, [key, value]) => ({
						...acc,
						[key]: Number(String(value).replace("px", "")),
					}),
					{},
				),
			},
		)

		matchComponents(
			{
				...Object.entries(shadowVariants).reduce(
					(acc, [key, value]) => ({
						...acc,
						[key]: (val: number) => ({
							boxShadow: value(val),
						}),
					}),
					{},
				),
			},
			{
				type: "number",
				values: Object.entries(theme("shadowSteps")).reduce(
					(acc, [key, value]) => ({
						...acc,
						[key]: Number(String(value).replace("px", "")),
					}),
					{},
				),
			},
		)
	},
	{
		theme: {
			experimental: false,
			shadowVariants: {
				...SHADOW_VARIANTS,
			},
			dropShadowVariants: {
				...DROP_SHADOW_VARIANTS,
			},
			dropShadowSteps: {
				xs: "1px",
				sm: "2px",
				md: "4px",
				lg: "8px",
				xl: "16px",
				"2xl": "32px",
				"3xl": "64px",
				"4xl": "128px",
				"5xl": "256px",
			},
			shadowSteps: {
				xs: "1px",
				sm: "2px",
				md: "4px",
				lg: "8px",
				xl: "16px",
				"2xl": "32px",
				"3xl": "64px",
				"4xl": "128px",
				"5xl": "256px",
			},
			textShadowSteps: {
				xs: "1px",
				sm: "2px",
				md: "3px",
				lg: "4px",
				xl: "5px",
				"2xl": "6px",
				"3xl": "7px",
				"4xl": "8px",
				"5xl": "9px",
			},
		},
	},
)