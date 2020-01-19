<template>
    <div class="option-card" :class="{ selected: option.selected }" @click="selectOption">
        <b-row no-gutters align-v="center">
            <b-img-lazy :src="optionLogo" class="optionLogo mr-3"></b-img-lazy>
            <h5>{{ option.name }}</h5>
        </b-row>

        <div class="py-4">
            <div class="border-bottom p-1">
                <span>{{ $t('Post: {monthlyLimit}/month ({weeklyLimit}/week)', postParams) }}</span>
            </div>

            <div class="border-bottom p-1">
                <span>{{ $t('Meeting：{monthlyLimit}/month', meetingParams) }}</span>
                <span>{{ amenities }}</span>
            </div>

            <div class="p-1">{{ $t('Report：{monthlyLimit}/month', reportParams) }}</div>
        </div>

        <h5 class="font-weight-bold">
            <span v-if="option.fee > 0" class="mr-1">+</span>
            <span>{{ $n(option.fee, 'currency') }}</span>
        </h5>
    </div>
</template>

<script>
import "@/assets/scss/components/OptionCard.scss";

export default {
    props: ["option"],
    computed: {
        postLv() {
            return this.$store.state.postLv;
        },
        meetingLv() {
            return this.$store.state.meetingLv;
        },
        optionLogo() {
            return `/img/${this.option.name}.png`;
        },
        postParams() {
            return {
                ...this.option.post[this.postLv]
            };
        },
        meetingParams() {
            return {
                ...this.option.meeting[this.meetingLv]
            };
        },
        amenities() {
            if (this.meetingParams.amenities.length) {
                let amenities = this.meetingParams.amenities
                    .map(amenity => amenity.text)
                    .join(this.$t("separator;"));
                return this.$t("({amenities})", { amenities });
            }

            return null;
        },
        reportParams() {
            return {
                ...this.option.report
            };
        }
    },
    methods: {
        selectOption() {
            this.option.selected = !this.option.selected;
        }
    }
};
</script>
