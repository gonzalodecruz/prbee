<template>
    <div>
        <h1 class="text-center py-4">{{ $t('Subscribe') }}</h1>
        <div class="text-center">{{ $t('Subscribe description') }}</div>

        <header-divider></header-divider>

        <h3 class="font-weight-bold text-center py-5">
            <span>{{ $t('Basic price: {price}/month', { price: $n(basicPrice, "currency") }) }}</span>
        </h3>

        <div class="option">
            <div class="title">{{ $t('SNS plan') }}</div>
            <div class="content">
                <div>{{ $t('SNS plan description') }}</div>

                <b-row class="py-5" align-h="around" no-gutters>
                    <option-card
                        :key="option.name"
                        :option="option"
                        v-for="option in snsOptions"
                        class="mb-3"
                    ></option-card>
                </b-row>

                <div class="text-center">
                    <b-button
                        squared
                        size="lg"
                        variant="secondary"
                        class="text-white px-sm-5"
                        v-b-modal.sns-modal
                    >
                        <b-row no-gutters align-v="center">
                            <b-img-lazy class="d-none d-sm-block" src="/img/question_icon.png"></b-img-lazy>
                            <span>{{ $t('SNS features') }}</span>
                        </b-row>
                    </b-button>
                </div>

                <b-modal
                    id="sns-modal"
                    centered
                    hide-header
                    hide-footer
                >{{ $t('Dummy description') }}</b-modal>
            </div>
        </div>

        <div class="option mt-4">
            <div class="title">{{ $t('Post pace plan') }}</div>
            <div class="content">
                <div>{{ $t('Post pace plan description') }}</div>

                <b-row class="py-5" align-h="around" no-gutters>
                    <lv-option-card
                        :key="index"
                        :option="option"
                        :index="index"
                        :snsOptions="snsOptions"
                        v-for="(option, index) in postLvOptions"
                        class="mb-3"
                        @selected="postLvSelected"
                    ></lv-option-card>
                </b-row>

                <div class="text-center">
                    <b-button
                        squared
                        size="lg"
                        variant="secondary"
                        class="text-white px-sm-5"
                        v-b-modal.post-modal
                    >
                        <b-row no-gutters align-v="center">
                            <b-img-lazy class="d-none d-sm-block" src="/img/question_icon.png"></b-img-lazy>
                            <span>{{ $t('More about post pace plan') }}</span>
                        </b-row>
                    </b-button>
                </div>

                <b-modal
                    id="post-modal"
                    centered
                    hide-header
                    hide-footer
                >{{ $t('Dummy description') }}</b-modal>
            </div>
        </div>

        <div class="option mt-4">
            <div class="title">{{ $t('Meeting plan') }}</div>
            <div class="content">
                <div>{{ $t('Meeting plan description') }}</div>
                <div>{{ $t('Meeting plan description 2') }}</div>

                <b-row class="py-5" align-h="around" no-gutters>
                    <lv-option-card
                        :key="index"
                        :option="option"
                        :index="index"
                        :snsOptions="snsOptions"
                        v-for="(option, index) in meetingLvOptions"
                        class="mb-3"
                        @selected="meetingLvSelected"
                    ></lv-option-card>
                </b-row>

                <div class="text-center">
                    <b-button
                        squared
                        size="lg"
                        variant="secondary"
                        class="text-white px-sm-5"
                        v-b-modal.meeting-modal
                    >
                        <b-row no-gutters align-v="center">
                            <b-img-lazy class="d-none d-sm-block" src="/img/question_icon.png"></b-img-lazy>
                            <span>{{ $t('More about meeting plan') }}</span>
                        </b-row>
                    </b-button>
                </div>

                <b-modal
                    id="meeting-modal"
                    centered
                    hide-header
                    hide-footer
                >{{ $t('Dummy description') }}</b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderDivider from "@/components/HeaderDivider";
import OptionCard from "@/components/OptionCard";
import LvOptionCard from "@/components/LvOptionCard";

export default {
    computed: {
        selectedOptions() {
            return this.snsOptions.filter(option => option.selected);
        }
    },
    watch: {
        "selectedOptions.length"(length) {
            if (length > 0) {
                this.snsOptions.forEach(option => {
                    if (!option.selected) {
                        option.fee = this.optionAdditionalFee;
                    }
                });

                if (!this.snsOptions.filter(option => !option.fee).length) {
                    this.selectedOptions[0].fee = 0;
                }
            } else {
                this.snsOptions.forEach(option => {
                    option.fee = 0;
                });
            }

            this.updateTotalPrice();
        }
    },
    data: () => ({
        basicPrice: 0,
        optionAdditionalFee: 0,
        snsOptions: [],
        postLvOptions: [],
        meetingLvOptions: []
    }),
    methods: {
        async loadSchema() {
            const { data } = await this.$api.getSchema();
            const schema = { ...data };
            Object.keys(schema).forEach(key => {
                this[key] = schema[key];
            });
            this.updateTotalPrice();
        },
        updateTotalPrice() {
            let totalPrice = this.basicPrice;
            totalPrice += this.snsOptions
                .filter(option => option.selected)
                .reduce((sum, option) => sum + option.fee * 1, 0);
            totalPrice += this.postLvOptions
                .filter(option => option.selected)
                .reduce((sum, option) => sum + option.fee * 1, 0);
            totalPrice += this.meetingLvOptions
                .filter(option => option.selected)
                .reduce((sum, option) => sum + option.fee * 1, 0);
            this.$store.dispatch("updateTotalPrice", totalPrice);
        },
        postLvSelected(option) {
            this.postLvOptions.forEach(option => {
                option.selected = false;
            });
            option.selected = true;
            this.$store.dispatch(
                "updatePostLv",
                this.postLvOptions.indexOf(option)
            );
            this.updateTotalPrice();
        },
        meetingLvSelected(option) {
            this.meetingLvOptions.forEach(option => {
                option.selected = false;
            });
            option.selected = true;
            this.$store.dispatch(
                "updateMeetingLv",
                this.meetingLvOptions.indexOf(option)
            );
            this.updateTotalPrice();
        }
    },
    created() {
        this.loadSchema();
    },
    components: {
        HeaderDivider,
        OptionCard,
        LvOptionCard
    }
};
</script>
