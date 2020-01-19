<template>
    <div class="footer" ref="footer">
        <b-container>
            <b-row align-v="center">
                <b-col sm="2" lg="4" class="character">
                    <b-img-lazy src="/img/prbee_character.png" fluid alt="Responsive image"></b-img-lazy>
                </b-col>
                <b-col sm="10" lg="8">
                    <b-row align-v="center">
                        <b-col md="6">
                            <b-row
                                align-h="between"
                                align-v="end"
                                no-gutters
                                class="border-bottom border-dark p-2"
                            >
                                <h5>{{ $t('Monthly price') }}</h5>
                                <h3 class="font-weight-bold">{{ $n(totalPrice, 'currency') }}</h3>
                            </b-row>
                            <b-row align-h="end" no-gutters class="p-2">{{ $t('(Tax excluded)') }}</b-row>
                        </b-col>
                        <b-col md="6" class="text-center text-md-right">
                            <b-button
                                squared
                                size="lg"
                                variant="dark"
                            >{{ $t('Subscribe current plan') }}</b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    computed: {
        totalPrice() {
            return this.$store.state.totalPrice;
        }
    },
    mounted() {
        this.$root.$on("bv::modal::show", () => {
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth;
            this.$refs.footer.style.right = `${scrollbarWidth}px`;
        });
        this.$root.$on("bv::modal::hidden", () => {
            this.$refs.footer.style.right = 0;
        });
    }
};
</script>
