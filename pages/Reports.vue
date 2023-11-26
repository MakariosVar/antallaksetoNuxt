<template>
    <div class="container">
        <div class="h2 text-center py-2">
            Αναφορές
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-6" v-if="(postReports && Object.entries(postReports).length > 0) || postReports.length">
                <div class="row">
                    <div class="h4 pt-1">
                        Αγγελίες
                    </div>
                    <div v-for="(reportGroup, index) in postReports" class="col-12 my-1" :key="reportGroup.id">
                        <div class="card">
                            <div class="card-header" @click="toggleCollapse('collapse-' + index)" style="cursor: pointer;">
                                <div class="row">
                                    <div class="col-11">
                                        <nuxt-link :to="{ path: '/posts/view', query: { id: reportGroup[0].post.id } }">
                                            {{reportGroup[0].post.title}}
                                        </nuxt-link>
                                        <i>
                                            ({{ Object.keys(reportGroup).length }})
                                        </i>
                                    </div>
                                    <div class="col-1">
                                        <font-awesome-icon :icon="['fas', 'caret-down']" class="me-2" />
                                    </div>
                                </div>
                            </div>
                            <div :id="'collapse-' + index" class="collapse" :class="{ 'show': collapsedGroups.includes('collapse-' + index) }">
                                <div class="card-body">
                                    <div class="row list-group">
                                        <div class="col-12 list-group-item" v-for="report in reportGroup" :key="report.id">
                                            <p v-if="report.other_text" class="row my-0">
                                                <div class="col-11">
                                                    {{report.other_text}}
                                                </div>
                                                <div class="col-1">
                                                    <a @click="deleteReport(report.id)" class="float-end text-danger" title="Διαγραφή αναφοράς">
                                                        <font-awesome-icon :icon="['fas', 'trash-can']" class="me-2" />
                                                    </a>
                                                </div>
                                            </p>
                                            <p v-else class="row my-0">
                                                <div class="col-11">
                                                    {{parseReportCategoryName(report.report_category)}}
                                                </div>
                                                <div class="col-1">
                                                    <a @click="deleteReport(report.id)" class="float-end text-danger" title="Διαγραφή αναφοράς">
                                                        <font-awesome-icon :icon="['fas', 'trash-can']" class="me-2" />
                                                    </a>
                                                </div>
                                                <span style="font-size: 0.8rem;">
                                                    {{parseReportCategoryDescription(report.report_category)}}
                                                </span>
                                            </p>
                                            <span class="text-muted" style="font-size: 0.8rem;">
                                                <div>
                                                    reported by:
                                                    <nuxt-link v-if="report.reporter" :to="{ path: '/Profile', query: { id: report.reporter.id } }">
                                                        {{ report.reporter.name }}
                                                    </nuxt-link>
                                                </div>
                                                <div>
                                                    reported at: {{ formatDate(report.created_at) }}
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6" v-if="(profileReports && Object.entries(profileReports).length > 0) || profileReports.length">
                <div class="row">
                    <div class="h4 pt-1">
                        Προφίλ
                    </div>
                    <div v-for="(reportGroup, index) in profileReports" class="col-12 my-1" :key="reportGroup.id">
                        <div class="card">
                            <div class="card-header" @click="toggleCollapse('collapse-' + index)" style="cursor: pointer;">
                                <div class="row">
                                    <div class="col-11">
                                        <nuxt-link :to="{ path: '/Profile', query: { id: reportGroup[0].profile.id } }">
                                            {{reportGroup[0].profile.name}}
                                        </nuxt-link>
                                        <i>
                                            ({{ Object.keys(reportGroup).length }})
                                        </i>
                                    </div>
                                    <div class="col-1">
                                        <font-awesome-icon :icon="['fas', 'caret-down']" class="me-2" />
                                    </div>
                                </div>
                            </div>
                            <div :id="'collapse-' + index" class="collapse" :class="{ 'show': collapsedGroups.includes('collapse-' + index) }">
                                <div class="card-body">
                                    <div class="row list-group">
                                        <div class="col-12 list-group-item" v-for="report in reportGroup" :key="report.id">
                                            <p v-if="report.other_text" class="row my-0">
                                                <div class="col-11">
                                                    {{report.other_text}}
                                                </div>
                                                <div class="col-1">
                                                    <a @click="deleteReport(report.id)" class="float-end text-danger" title="Διαγραφή αναφοράς">
                                                        <font-awesome-icon :icon="['fas', 'trash-can']" class="me-2" />
                                                    </a>
                                                </div>
                                            </p>
                                            <p v-else class="row my-0">
                                                <div class="col-11">
                                                    {{parseReportCategoryName(report.report_category)}}
                                                </div>
                                                <div class="col-1">
                                                    <a @click="deleteReport(report.id)" class="float-end text-danger" title="Διαγραφή αναφοράς">
                                                        <font-awesome-icon :icon="['fas', 'trash-can']" class="me-2" />
                                                    </a>
                                                </div>
                                                <span style="font-size: 0.8rem;">
                                                    {{parseReportCategoryDescription(report.report_category)}}
                                                </span>
                                            </p>
                                            <span class="text-muted" style="font-size: 0.8rem;">
                                                <div>
                                                    reported by:
                                                    <nuxt-link v-if="report.reporter" :to="{ path: '/Profile', query: { id: report.reporter.id } }">
                                                        {{ report.reporter.name }}
                                                    </nuxt-link>
                                                </div>
                                                <div>
                                                    reported at: {{ formatDate(report.created_at) }}
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'Reports',
        props: ['user'],
        data() {
            return {
                postReports: [],
                profileReports: [],
                collapsedGroups: []
            }
        },
        created() {
            if (!this.user || (this.user && this.user.role_id == 2)) {
                this.$router.push({name: 'Home'})
            } else {
                this.getPostReports();
                this.getProfileReports();
            }
        },
        methods: {
            toggleCollapse(collapseId) {
                const index = this.collapsedGroups.indexOf(collapseId);
                if (index === -1) {
                    this.collapsedGroups.push(collapseId); // Collapsing if not already collapsed
                } else {
                    this.collapsedGroups.splice(index, 1); // Expanding if already collapsed
                }
            },
            formatDate(dateString) {
                const date = new Date(dateString); // Convert dateString to a Date object
                if (isNaN(date.getTime())) {
                    // Handle invalid date here
                    return 'Invalid date';
                }

                const formattedDate = new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false, // 24-hour format
                }).format(date);

                return formattedDate;
            },
            parseReportCategoryName (category) {
                switch (category) {
                    case 'false_or_misleading':
                        return 'Παραπλανητικό Περιεχόμενο'
                    case 'invalid_context':
                        return 'Ακατάλληλο Περιεχόμενο'                
                    case 'scam':
                        return 'Ανεπιθύμητο ή Απάτη'
                    case 'violance_content':
                        return 'Βία ή Επιβλαβές Συμπεριφορά'
                    case 'copyright':
                        return 'Παραβίαση Πνευματικών Δικαιωμάτων'
                    case 'political':
                        return 'Πολιτικά ή Κοινωνικά Θέματα'
                    default:
                        return '';
                }
            },
            parseReportCategoryDescription (category) {
                switch (category) {
                    case 'false_or_misleading':
                        return 'Ψευδής ή παραπλανητικές πλήροφορίες στην αγγελία.'
                    case 'invalid_context':
                        return 'Προσβλητικό ή ακατάλληλο περιεχόμενο.'                
                    case 'scam':
                        return 'Προωθεί απάτες, "ψαρέματα" ή μη επιθυμητό περιεχόμενο.'
                    case 'violance_content':
                        return 'Παρουσιάζει βίαιες ή επιβλαβείς ενέργειες.'
                    case 'copyright':
                        return 'Ανεξουσίαστη χρήση πνευματικού υλικού.'
                    case 'political':
                        return 'Παραπλανητικά πολιτικά ή κοινωνικά μηνύματα.'
                    default:
                        return '';
                }
            },
            async deleteReport(id) {
                const response = await $fetch(`/api/deleteReport?token=${this.user.auth_token}&id=${id}`)
                
                if (response && response.deleteResponse && response.deleteResponse.status == 'success') {
                    this.getPostReports();
                    this.getProfileReports();
                }
            },
            async getPostReports() {
                const response = await $fetch(`/api/getReports?token=${this.user.auth_token}&type=POST`)

                if (response && response.data && response.data.status == 'success' && response.data.data) {
                    this.postReports = response.data.data
                } else {
                    this.postReports = false;
                }
            },
            async getProfileReports() {
                const response = await $fetch(`/api/getReports?token=${this.user.auth_token}&type=PROFILE`)

                if (response && response.data && response.data.status == 'success' && response.data.data) {
                    this.profileReports = response.data.data
                } else {
                    this.profileReports = false;
                }
            }
        }
    }
</script>