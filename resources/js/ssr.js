import './bootstrap';
import '../css/app.css';
import "vue-select/dist/vue-select.css";
import { createSSRApp, h } from 'vue';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { Head, Link, createInertiaApp } from '@inertiajs/vue3';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"
import VueSelect from 'vue-select';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';


const appName = import.meta.env.VITE_APP_NAME || 'Ribara';

createServer( page =>
    createInertiaApp( {
        page, render: renderToString,
        title: ( title ) => `${ title } - ${ appName }: Bridging Skill Gaps and Unlocking Dream Jobs`,
        resolve: ( name ) => {
            const pages = import.meta.glob( './Pages/**/*.vue', { eager: true } )
            return pages[ `./Pages/${ name }.vue` ]
        },
        setup( { el, App, props, plugin } ) {
            return createSSRApp( { render: () => h( App, props ) } )
                .component( 'Link', Link )
                .component( 'Head', Head )
                .component( "infinite-loading", InfiniteLoading )
                .component( "v-select", VueSelect )
                .use( plugin )
                .use( ZiggyVue, Ziggy )
                .use( VCalendar, {} )

        },
        progress: {
            color: '#4B5563',
            showSpinner: true,
        },
    } ) )
