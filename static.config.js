import React, { Component } from 'react'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
	siteRoot: 'https://www.monsieur.tech',
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
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" integrity="sha256-UK1EiopXIL+KVhfbFa8xrmAWPeBjMVdvYMYkTAEv/HI=" crossOrigin="anonymous" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" integrity="sha256-j+P6EZJVrbXgwSR5Mx+eCS6FvP9Wq27MBRC/ogVriY0=" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css?family=Arimo:400,700" rel="stylesheet" />
			</Head>
			<Body>
				{children}
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.0.1/jquery-migrate.min.js" integrity="sha256-F0O1TmEa4I8N24nY0bya59eP6svWcshqX1uzwaWC4F4=" crossOrigin="anonymous" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js" integrity="sha256-DHF4zGyjT7GOMPBwpeehwoey18z8uiz98G4PRu2lV0A=" crossOrigin="anonymous" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/stellar.js/0.6.2/jquery.stellar.min.js" integrity="sha256-aQ6KGDKk7w8XQNZsQaQnbfeC//XPUIphSp/X/ZEwtV0=" crossOrigin="anonymous" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.sticky/1.0.4/jquery.sticky.min.js" integrity="sha256-9p9wUORIjnIRp9PAyZGxql6KgJRNiH04y+8V4JjUhn0=" crossOrigin="anonymous" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-one-page-nav/3.0.0/jquery.nav.min.js" integrity="sha256-uyKq3i+Mv8CWwJ2iheLNVB5fJWs6CJAJDIoEPrbUsUc=" crossOrigin="anonymous" />
				<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js" />
			</Body>
		</Html>
	)
}