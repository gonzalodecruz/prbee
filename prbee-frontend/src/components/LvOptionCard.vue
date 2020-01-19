<template>
    <div class="option-card" :class="{ selected: option.selected }" @click="selectLevel">
        <b-row no-gutters align-v="center">
            <b-img-lazy :src="lvLogo" class="lvLogo mr-3"></b-img-lazy>
            <h3 class="font-weight-bold">{{ option.name }}</h3>
        </b-row>

        <div class="py-4" v-if="option.type == 'post'">
            <b-row
                no-gutters
                :key="index"
                v-for="(option, index) in lvOptions"
                class="p-1 text-secondary"
                :class="{ 'border-bottom': index != lvOptions.length - 1, 'text-dark': option.selected }"
            >
                <div style="width: 100px">{{ option.name }}</div>
                <div>{{ $t('{monthlyLimit}/month ({weeklyLimit}/week)', option.params) }}</div>
            </b-row>
        </div>

        <div class="py-4" v-else-if="option.type=='meeting'">
            <div class="border-bottom p-1">
                <span>{{ $t('Limit: {monthlyLimit}/month', lvOptions[0].params) }}</span>
                <span>{{ amenities }}</span>
                <!-- <span>（1時間）</span> -->
            </div>
            <div class="p-1">{{ $t('Dummy description') }}</div>
        </div>

        <h5 class="font-weight-bold">
            <span v-if="option.fee > 0" class="mr-1">+</span>
            <span>{{ $n(option.fee, 'currency') }}</span>
        </h5>
    </div>
</template>

<script>
export default {
    props: ["option", "index", "snsOptions"],
    computed: {
        lvLogo() {
            return `/img/${this.option.type}_icon.png`;
        },
        lvOptions() {
            return (this.snsOptions || []).map(option => ({
                name: option.name,
                selected: option.selected,
                params: { ...option[this.option.type][this.index] }
            }));
        },
        amenities() {
            if (
                this.option.type == "meeting" &&
                this.lvOptions[0].params.amenities.length
            ) {
                let amenities = this.lvOptions[0].params.amenities
                    .map(amenity => amenity.text)
                    .join(this.$t("separator;"));
                return this.$t("({amenities})", { amenities });
            }

            return null;
        }
    },
    methods: {
        selectLevel() {
            this.$emit("selected", this.option);
        }
    }
};
</script>
