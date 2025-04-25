---
title: Button 按钮 | Hz-Elemnet
description: Button 组件的文档
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/button/basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 禁用状态

使用 `disabled` 属性来控制按钮是否为禁用状态, 该属性接受一个 `boolean` 类型的值。

<preview path="../demo/button/disabled.vue" title="禁用状态" description="Button 组件的禁用状态"></preview>

## 链接按钮

使用 `link` 属性设置按钮是否为链接按钮, 该属性接受一个 `boolean` 类型的值。可以使用 `type` 属性设置链接按钮的主题样式

<preview path="../demo/button/link.vue" title="链接按钮" description="Button 组件的链接按钮"></preview>

## 文字按钮

使用 `text` 属性设置按钮是否为文字按钮, 该属性接受一个 `boolean` 类型的值。

使用 `textBg` 属性控制文字按钮是否带有背景颜色, 该属性接受一个 `boolean` 类型的值。

<preview path="../demo/button/text.vue" title="文字按钮" description="Button 组件的文字按钮"></preview>

## 图标按钮

使用 `icon` 属性为按钮添加图标, 通过 `iconPosition` 控制图标显示在按钮左侧还是右侧。

<preview path="../demo/button/icon.vue" title="图标按钮" description="Button 组件的图标按钮"></preview>

## 按钮组

使用 `<hz-button-group>` 对多个按钮分组。

`<hz-button-group>` 中的 `type` 和 `size` 属性, 可以通过 `<hz-button>` 中的 `type` 和 `size` 属性进行覆盖。

<preview path="../demo/button/group.vue" title="按钮组" description="Button 组件的按钮组"></preview>

## 加载状态按钮

使用 `loading` 属性设置按钮是否为加载中状态, 该属性接受一个 `boolean` 类型的值。

使用 `loadingIcon` 属性可以修改 loading 图标

<preview path="../demo/button/loading.vue" title="加载状态按钮" description="Button 组件的加载状态按钮"></preview>

## 调整尺寸

使用 `size` 属性设置按钮的尺寸, 可以使用 `large` 和 `small` 两种值。

<preview path="../demo/button/size.vue" title="调整尺寸" description="Button 组件的调整尺寸"></preview>

## 标签

可以自定义元素标签。例如, 按钮、div、路由链接。

<preview path="../demo/button/tag.vue" title="标签" description="Button 组件的标签"></preview>

## 自定义颜色

使用 `color` 属性自定义按钮的颜色。

<preview path="../demo/button/custom.vue" title="自定义颜色" description="Button 组件的自定义颜色"></preview>

## Button API

### Button Attributes

| 属性名       | 说明                                                        | 类型                                                             | 默认值  |
| ------------ | ----------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| size         | 按钮尺寸                                                    | `enum` - `'large' \| 'default' \| 'small'`                       | —       |
| type         | 按钮类型，在设置 `color` 时，后者优先                       | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain        | 是否为朴素按钮                                              | `boolean`                                                        | false   |
| link         | 是否为链接按钮                                              | `boolean`                                                        | false   |
| text         | 是否为文字按钮                                              | `boolean`                                                        | false   |
| textBg       | 是否显示文字按钮背景颜色                                    | `boolean`                                                        | false   |
| round        | 是否为圆角按钮                                              | `boolean`                                                        | false   |
| circle       | 是否为圆形按钮                                              | `boolean`                                                        | false   |
| loading      | 是否为加载中状态                                            | `boolean`                                                        | false   |
| loadingIcon  | 自定义加载中状态图标组件                                    | `string`                                                         | spinner |
| disabled     | 按钮是否为禁用状态                                          | `boolean`                                                        | false   |
| icon         | 图标组件                                                    | `string`                                                         | —       |
| iconPosition | 图标组件显示在按钮方向                                      | `enum` - `'left' \| 'right'`                                     | left    |
| autofocus    | 原生 `autofocus` 属性                                       | `boolean`                                                        | false   |
| nativeType   | 原生 `type` 属性                                            | `enum` - `'button'\| 'submit'\| 'reset'`                         | button  |
| color        | 自定义按钮颜色，并自动计算 `hover` 和 `active` 触发后的颜色 | `string`                                                         | —       |
| tag          | 自定义元素标签                                              | `string` \/ `Component`                                          | button  |

### Button Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

### Button Exposes

| 属性名 | 说明             | 类型                                |
| ------ | ---------------- | ----------------------------------- |
| ref    | 按钮 `html` 元素 | `object` - `Ref<HTMLButtonElement>` |

## ButtonGroup API

### ButtonGroup Attributes

| 属性名 | 说明                         | 类型                                                             | 默认值 |
| ------ | ---------------------------- | ---------------------------------------------------------------- | ------ |
| size   | 用于控制该按钮组内按钮的大小 | `enum` - `'large' \| 'default' \| 'small'`                       | —      |
| type   | 用于控制该按钮组内按钮的类型 | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —      |

### Button Slots

| 插槽名  | 说明             | 子标签 |
| ------- | ---------------- | ------ |
| default | 自定义按钮组内容 | Button |
