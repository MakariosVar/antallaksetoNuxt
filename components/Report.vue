<template>
    <span>
        <a href="#" @click.prevent="handleReportButtonClick" :class="reportButtonClass"
            @mouseover="isReportButtonHovered = true" @mouseout="isReportButtonHovered = false" title="Αναφορά Αγγελίας"
            data-bs-toggle="modal" data-bs-target="#reportModal">
            Αναφορά<font-awesome-icon :icon="['fas', 'circle-exclamation']" class="ms-1" />
        </a>
        <div v-if="isSessionActive" class="modal fade" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reportModalLabel">Αναφορά αγγελίας</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <div v-for="(reason, index) in reportReasons" :key="index" class="form-check">
                            <input v-model="selectedReportReason" :value="reason.value" class="form-check-input"
                                type="radio" :id="reason.value">
                            <label :for="reason.value" class="form-check-label">
                                <strong>{{ reason.label }}</strong> {{ reason.description }}
                            </label>
                        </div>
                        <div v-if="selectedReportReason === 'other'" class="form-group">
                            <textarea class="form-control" :class="{ 'is-invalid': isOtherReasonInvalid }"
                                v-model="other_text" rows="4" placeholder="Εισάγετε το κείμενο αναφοράς σας εδώ">
                        </textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ακύρωση</button>
                        <button type="button" @click="submitReport" class="btn btn-danger">Αναφορά</button>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>
  
<script>
export default {
    name: 'PostReport',
    props: ['user', 'object_type', 'object_id'],
    data() {
        return {
            isReportButtonHovered: false,
            selectedReportReason: 'false_or_misleading',
            other_text: '',
            reportReasons: [
                {
                    value: 'false_or_misleading',
                    label: 'Παραπλανητικό Περιεχόμενο:',
                    description: 'Ψευδής ή παραπλανητικές πλήροφορίες στην αγγελία.'
                },
                {
                    value: 'invalid_context',
                    label: 'Ακατάλληλο Περιεχόμενο:',
                    description: 'Προσβλητικό ή ακατάλληλο περιεχόμενο.'
                },
                {
                    value: 'scam',
                    label: 'Ανεπιθύμητο ή Απάτη:',
                    description: 'Προωθεί απάτες, "ψαρέματα" ή μη επιθυμητό περιεχόμενο.'
                },
                {
                    value: 'violance_content',
                    label: 'Βία ή Επιβλαβές Συμπεριφορά:',
                    description: 'Παρουσιάζει βίαιες ή επιβλαβείς ενέργειες.'
                },
                {
                    value: 'copyright',
                    label: 'Παραβίαση Πνευματικών Δικαιωμάτων:',
                    description: 'Ανεξουσίαστη χρήση πνευματικού υλικού.'
                },
                {
                    value: 'political',
                    label: 'Πολιτικά ή Κοινωνικά Θέματα:',
                    description: 'Παραπλανητικά πολιτικά ή κοινωνικά μηνύματα.'
                },
                {
                    value: 'other',
                    label: 'Άλλο',
                    description: ''
                }
            ],
            isSessionActive: false,
        }
    },
    computed: {
        reportButtonClass() {
            return this.isReportButtonHovered ? 'link-danger' : 'link-secondary';
        },
        isOtherReasonInvalid() {
            return this.selectedReportReason === 'other' && this.other_text === '';
        }
    },
    async mounted() {
        this.isSessionActive = await this.checkSession();
    },
    methods: {
        async checkSession() {
            if (this.user) {
                const response = await $fetch(`/api/checkSession?token=${this.user.auth_token}`)
                if (response && response.sessionResponse && response.sessionResponse.session) {
                    return true;
                }
            }
            return false;
        },
        async handleReportButtonClick(e) {
            this.isSessionActive = await this.checkSession();

            if (!this.isSessionActive) {
                this.$emit('sessionExpired')
            }
        },
        async submitReport() {
            if (!this.isOtherReasonInvalid) {
                var url = `/api/report?`
                url = `${url}user_id=${this.user.id}`;
                url = `${url}&object_type=${this.object_type}`;
                url = `${url}&object_id=${this.object_id}`;
                url = `${url}&category=${this.selectedReportReason}`;
                if (this.selectedReportReason == 'other') {
                    url = `${url}&other_text=${this.other_text}`;
                }
                const response = await $fetch(url)

                if (response && response.reportData && response.reportData.status == 'success') {
                    alert('Η αναφορά στάλθηκε επιτυχώς')
                }
                if (process.client) {
                    location.reload()
                }
            }
        }
    }
}
</script>