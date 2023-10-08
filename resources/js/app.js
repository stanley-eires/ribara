import './bootstrap';
import '../css/app.css';
import "vue-select/dist/vue-select.css";
import { createApp, createSSRApp, h } from 'vue';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Head, Link, createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"
import VueSelect from 'vue-select';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import CTextarea from '@/Components/CTextarea.vue'

const appName = import.meta.env.VITE_APP_NAME || 'Ribara';

createInertiaApp( {
    title: ( title ) => `${ title } - ${ appName }: Bridging Skill Gaps and Unlocking Dream Jobs`,
    resolve: ( name ) => resolvePageComponent( `./Pages/${ name }.vue`, import.meta.glob( './Pages/**/*.vue' ) ),
    setup( { el, App, props, plugin } ) {
        return createSSRApp( { render: () => h( App, props ) } )
            .component( 'Link', Link )
            .component( 'Head', Head )
            .component( "infinite-loading", InfiniteLoading )
            .component( "v-select", VueSelect )
            .component( "c-textarea", CTextarea )
            .use( plugin )
            .use( ZiggyVue, Ziggy )
            .use( VCalendar, {} )
            .use(
                Vue3Toasity, { autoClose: 10000, dangerouslyHTMLString: true, theme: 'light' }
            )
            .mount( el );
    },
    progress: {
        color: '#4B5563',
        showSpinner: true,
    },
} );
