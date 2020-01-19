<template>
    <div>
        <b-navbar variant="dark" type="dark">
            <b-navbar-brand :to="{ name: 'home' }">Prbee</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <span>{{ $auth.user().email }}</span>
                        </template>
                        <b-dropdown-item href="#" @click.prevent="logout">{{ $t('Logout') }}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-container fluid>
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$auth.logout();
        }
    }
};
</script>
