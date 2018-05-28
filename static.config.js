import React, { Component } from 'react'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { ServerStyleSheet } from 'styled-components'

export default {
	getSiteData: () => ({
		title: 'M.TECH',
		author: 'Baptiste Augrain',
		lastBuilt: Date.now()
	}),
	getRoutes: async () => {
		return [
			{
				path: '/',
				component: 'src/pages/home'
			},
			{
				is404: true,
				component: 'src/pages/404'
			}
		]
	},
	renderToHtml: (render, Comp, meta) => {
		const sheet = new ServerStyleSheet()
		const html = render(sheet.collectStyles(<Comp />))
		meta.styleTags = sheet.getStyleElement()
		return html
	},
	webpack: (config, { defaultLoaders, stage }) => {
		let loaders = []
		
		if(stage === 'dev') {
			loaders = [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader'
				},
				{
					loader: 'sass-loader'
				}
			]
		}
		else {
			loaders = [
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						minimize: stage === 'prod',
						sourceMap: false
					}
				},
				{
					loader: 'sass-loader',
					options: {
						includePaths: ['src/']
					}
				}
			]
			
			// Don't extract css to file during node build process
			if(stage !== 'node') {
				loaders = ExtractTextPlugin.extract({
					fallback: {
						loader: 'style-loader',
						options: {
							sourceMap: false,
							hmr: false
						}
					},
					use: loaders
				})
			}
		}
		
		config.module.rules = [
			{
				oneOf: [
					{
						test: /\.s(a|c)ss$/,
						use: loaders
					},
					defaultLoaders.cssLoader,
					defaultLoaders.jsLoader,
					defaultLoaders.fileLoader
				]
			}
		]
		
		return config
	},
	Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
		<Html lang="fr">
			<Head>
				<meta content="text/html; charset=UTF-8" httpEquiv="content-type" />
				<title>{siteData.title}</title>
				<meta content="width=device-width, initial-scale=1.0, shrink-to-fit=no" name="viewport" />
				<meta content="{siteData.author}" name="author" />
				<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js" />
				{renderMeta.styleTags}
			</Head>
			<Body>
				{children}
			</Body>
		</Html>
	)
}