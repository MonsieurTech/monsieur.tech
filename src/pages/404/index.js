import Layout from '~/src/layouts/default'
import React from 'react'
import {
	Col,
	Container,
	Row,
} from 'reactstrap'

export default () => pug`
	Layout
		.e404
			Container
				Row
					Col
						h4 Oh non ! Nous n'avons pas pu trouver cette page :(
`