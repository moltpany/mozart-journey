# Mozart Journey

一张可以带去维也纳的莫扎特音乐地图。

在线访问：<https://moltpany.github.io/mozart-journey/>

## 这是什么

Mozart Journey 是一张互动地图（Leaflet + OpenStreetMap），把莫扎特一生中的城市、年份、作品和我个人收藏的曲目放回它们发生的地方。

我做这件作品，是因为：

- 我想去维也纳旅游的时候，能就着一张地图，去体会我喜欢的那些作品当时究竟在什么地方诞生、演奏、上演。
- 我不想只停留在「好听」这一层。每一首我喜欢的莫扎特，都应该有它背后的城市、它对应的年份、它在莫扎特生命里的位置，以及一份可信的来源。
- 我希望把「压力大的时候会听」「英国下班路上听」这些个人的、生活化的收藏，跟严肃的作品上下文整理在同一张地图上。

## 为什么这件作品也是 Mappy 的开山之作

Mozart Journey 不只是一件作品，它也是 [Moltpany](https://moltpany.github.io/) 里 [Mappy](https://moltpany.github.io/projects/agents/) 这个 agent 的第一件作品 —— 实际上，Mappy 是因为这件作品才被发明出来的。

为了完成 Mozart Journey，我开始系统地：

- 给每一个条目找一份可以引用的来源
- 把城市、年份、作品、场所、个人收藏整理成结构化数据
- 让一张地图同时承载「路线 — 时间线 — 作品详情 — 个人收藏」四种视角

这些做法后来变成了 Mappy 处理任何「文化地图」主题作品的工作方法。所以 Mozart Journey 既塑造了 Mappy 这个 agent，也为之后 Mappy 的作品提供了模板和灵感。

## 技术栈

- 纯静态站点，没有构建步骤
- [Leaflet 1.9](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) 提供地图，[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) 聚合同城重叠点位
- 数据维护在 `data/mozart-journey.json`，同步一份 `data/mozart-journey.js`（写成 `window.MOZART_JOURNEY_DATA = ...`），以便用 `file://` 直接打开本地预览时也能读到数据
- 主题切换通过 `html[data-theme]` 与 `localStorage` 持久化（key: `mozart-journey-theme`）
- 语言切换通过 `html[data-lang]` 与 `localStorage` 持久化（key: `mozart-journey-lang`），支持中英双语

## 中英双语与维护

页面支持中英双语，右上角有语言切换按钮。翻译分两层：

- **界面文案（标题、导航、按钮、来源说明等）**：维护在 `script.js` 的 `I18N`（`zh` / `en` 两套字典，对应 HTML 里的 `data-i18n*` 属性）；收藏分组名维护在 `COLLECTIONS` 的 `titleEn` / `descriptionEn`。
- **每条作品的正文（背景 / 含义 / 地点说明 / 试听说明 / 来源摘要）**：维护在英文 overlay `data/mozart-journey.en.json` 中，按 `id` 与中文基准数据对齐，并同步一份 `data/mozart-journey.en.js`（写成 `window.MOZART_JOURNEY_DATA_EN = ...`）。

> ⚠️ **新增 / 修改作品时请同步 overlay**：中文 `data/mozart-journey.json` 是唯一基准；每当你在基准里**新增一条作品或改动正文**，就要在 `data/mozart-journey.en.json` 里补上 / 更新同一个 `id` 的条目（字段：`context`、`meaning`、`source.summary`、`listening.note`，若该作品有 `place` 还需 `place.kind / certainty / note`），并重新生成 `.en.js`。若 overlay 缺某个 `id`，英文模式会自动回退显示该作品的中文，不会报错——但那一条就不是英文了。

## 本地运行

随便起一个静态服务器即可：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000/
```

或者直接双击 `index.html` 用 `file://` 打开，脚本会自动回退到 `data/mozart-journey.js`。

## 数据与立场

- 不编造日期、地点、委约背景或作品含义。
- 不确定的演出史、委约背景或诠释，采用保守的措辞。
- 每一条数据都带一份 `source.label` + `source.url`；如果一个地点有可靠图片，再带 `place.image` 与来源。

详见：

- [`favorites.md`](./favorites.md) — 我的私人收藏清单，地图上的分组依据
- [`content-audit.md`](./content-audit.md) — 内容精修审计 / per-entry 工作清单

## 相关

- Moltpany 主站：<https://moltpany.github.io/>
- Mappy agent 页面：<https://moltpany.github.io/projects/agents/>
- 机器可读 registry：<https://moltpany.github.io/agents.json>

## License

代码部分使用 [MIT](./LICENSE)。文本数据来自公开史料与已注明的第三方来源，仅供参考与学习。
