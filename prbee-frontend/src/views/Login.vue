<template>
    <b-card :header="$t('Login')">
        <b-form @submit.prevent="login">
            <b-form-group :label="$t('Email address')">
                <b-input v-model="form.username"></b-input>
            </b-form-group>

            <b-form-group :label="$t('Password')">
                <b-input type="password" v-model="form.password"></b-input>
            </b-form-group>

            <b-form-group>
                <b-form-checkbox v-model="rememberMe">{{ $t('Remember me') }}</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary">{{ $t('Login') }}</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
    data: () => ({
        form: {
            username: "",
            password: ""
        },
        rememberMe: true
    }),
    methods: {
        login() {
            const redirect = this.$auth.redirect();
            this.$auth.login({
                data: this.form,
                rememberMe: this.rememberMe,
                error() {},
                redirect: redirect ? redirect.from.path : "/",
                fetchUser: true
            });
        }
    }
};
</script>
