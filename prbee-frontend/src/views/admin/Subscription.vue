<template>
    <div>
        <b-form @submit.prevent="onSubmit">
            <b-row no-gutters align-v="center" align-h="between">
                <h1>{{ $t('Subscription form wizard') }}</h1>
                <b-button variant="primary" type="submit">{{ $t('Save') }}</b-button>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group :label="$t('Basic price')">
                        <b-form-input v-model="schema.basicPrice"></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col>
                    <b-form-group :label="$t('SNS option additional fee')">
                        <b-form-input v-model="schema.optionAdditionalFee"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col v-for="option in schema.snsOptions" :key="option.name">
                    <b-card :header="option.name">
                        <h5 class="border-bottom">{{ $t('Post') }}</h5>
                        <b-row v-for="(post, index) in option.post" :key="'post_' + index">
                            <b-col>
                                <b-form-group label-size="sm" :label="$t('Monthly limit')">
                                    <b-input size="sm" v-model="post.monthlyLimit"></b-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-size="sm" :label="$t('Weekly limit')">
                                    <b-input size="sm" v-model="post.weeklyLimit"></b-input>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <h5 class="border-bottom">{{ $t('Meeting') }}</h5>
                        <b-row v-for="(meeting, index) in option.meeting" :key="'meeting_' + index">
                            <b-col md="4">
                                <b-form-group label-size="sm" :label="$t('Monthly limit')">
                                    <b-input size="sm" v-model="meeting.monthlyLimit"></b-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-size="sm" :label="$t('Amenities')">
                                    <vue-tags-input
                                        v-model="meeting.amenity"
                                        :placeholder="$t('Add amenity')"
                                        :tags="meeting.amenities"
                                        @tags-changed="newTags => meeting.amenities = newTags"
                                    />
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <h5 class="border-bottom">{{ $t('Report') }}</h5>
                        <b-form-group label-size="sm" :label="$t('Monthly limit')">
                            <b-input size="sm" v-model="option.report.monthlyLimit"></b-input>
                        </b-form-group>
                    </b-card>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
export default {
    data: () => ({
        schema: {}
    }),
    methods: {
        async loadSchema() {
            const { data } = await this.$api.getSchema();
            this.schema = data;
        },
        onSubmit() {
            this.$api.saveSchema(this.schema);
        }
    },
    created() {
        this.loadSchema();
    }
};
</script>
