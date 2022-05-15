import Vue from 'vue';
import VueRouter, { RouteConfig } from "vue-router";
import Book from "@/components/Book.vue";
import Profile from "@/components/Profile.vue";
import BookList from '@/components/BookList.vue';
import Customer from "@/components/Customer.vue";
import CustomerList from '@/components/CustomerList.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: CustomerList
    },
    {
        path: '/books/edit/:id',
        name: 'bookEdit',
        component: Book
    },
    {
        path: '/books/create',
        name: 'bookAdd',
        component: Book
    },
    {
        path: '/books',
        name: 'bookList',
        component: BookList
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/customers/edit/:id',
        name: 'customerEdit',
        component: Customer
    },
    {
        path: '/customers/create',
        name: 'customerAdd',
        component: Customer
    },
    {
        path: '/customers',
        name: 'customers',
        component: CustomerList
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;


