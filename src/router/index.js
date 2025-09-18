	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import news from '@/views/news/list'
	import address from '@/views/address/list'
	import yonghu from '@/views/yonghu/list'
	import shangpinfenlei from '@/views/shangpinfenlei/list'
	import ershouwupin from '@/views/ershouwupin/list'
	import orders from '@/views/orders/list'
	import discussershouwupin from '@/views/discussershouwupin/list'
    import menu_manage from '@/views/menu_manage/list'
	import storeup from '@/views/storeup/list'
	import config from '@/views/config/list'
	import users from '@/views/users/list'
	import yonghuCenter from '@/views/yonghu/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: 'Home page',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页1',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: 'Reset password',
			component: () => import('../views/updatepassword.vue')
		}

		,{
			path: '/yonghuCenter',
			name: 'Personal',
			component: yonghuCenter
		}
		,{
			path: '/news',
			name: 'Announcement',
			component: news
		}
		,{
			path: '/address',
			name: 'Address',
			component: address
		}
		,{
			path: '/yonghu',
			name: 'User',
			component: yonghu
		}
		,{
			path: '/shangpinfenlei',
			name: 'Product Categories',
			component: shangpinfenlei
		}
		,{
			path: '/ershouwupin',
			name: 'Items',
			component: ershouwupin
		}
		,{
			path: '/orders',
			name: 'Order Management',
			component: orders
		}
		,{
			path: '/discussershouwupin',
			name: '二手物品评论-评论',
			component: discussershouwupin
		}
        ,{
            path: '/menu',
            name: 'Menu permissions',
            component: menu_manage
        }
		,{
			path: '/storeup',
			name: 'My Favorites',
			component: storeup
		}
		,{
			path: '/config',
			name: 'Carousel',
			component: config
		}
		,{
			path: '/users',
			name: 'Administrator',
			component: users
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
