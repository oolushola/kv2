<template>
    <div class="card">
        <div class="card-body">
            <form>
                &nbsp;
                <i class="icon-stack toggle" :class="{'text-primary': basicForm, 'text-danger': !basicForm }" @click="toggleForm" title="Upload bulk transporters details"></i>
                
                <div v-if="!basicForm">
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Choose a CSV file</label>
                                <input type="file">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-primary mt-3">Upload CSV</button>
                        </div>
                    </div>                
                </div>
                <div v-else> 
                    <ul>
                        <li class="menus" :class="[selected === tabs.tabName ? 'selectedClass' : '']" :href="`#${tabs.id}`"  v-for="(tabs, index) in menuTabs" @click="showTab(tabs.tabName)" :key="index">{{ tabs.tabName }}</li>
                    </ul>

                    <div class="row mt-3" id="basicInformation" :class="{'show': selected === 'Basic Information', 'hidden': selected !== 'Basic Information' }">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Assigned Staff</label>
                                <select class="form-control">
                                    <option value="">Choose a client</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Transporter Name</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Email</label>
                            <input type="text" class="form-control"  />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Phone Number</label>
                            <input type="text" class="form-control"  />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Address</label>
                            <textarea class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-3" id="bankDetails" :class="{'show': selected === 'Bank Details', 'hidden' :selected !=='Bank Details' }">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Bank Name</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Account Name</label>
                            <input type="text" class="form-control"  />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Account No</label>
                            <input type="text" class="form-control"  />
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3" id="guarantor" :class="{'show': selected === 'Guarantor', 'hidden' :selected !=='Guarantor' }">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Full Name</label>
                                <select class="form-control">
                                    <option value="">Choose a client</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Guarantor Phone No.</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Address.</label>
                            <input type="text" class="form-control"  />
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3" id ="nextOfKin" :class="{'show': selected === 'Next of Kin', 'hidden' :selected !=='Next of Kin' }">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Phone No.</label>
                            <input type="text" class="form-control"  />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Relationship.</label>
                            <input type="text" class="form-control"  />
                            </div>
                        </div>
                        <div class="col-md-6 font-weight-bold">
                            <div class="form-group">
                                <label>Address</label>
                            <textarea class="form-control"></textarea>
                            </div>
                        </div>
                    </div>

                    <legend class="font-weight-semibold"><i class="icon-stack mr-2"></i>Document Uploads</legend>
                    <div id="moreDocuments">
                        <p style="font-size:10px; cursor:pointer" @click="addmore" class="text-danger-400">Add More Documents</p>
                        <div class="form-group row" v-for="(document, index) in documents" :key="index">
                            <input type="file" name="document[]" class="col-md-5" style="font-size:10px; top:5px;">
                            <input type="text" name="description[]" class="" placeholder="Description"> <span class="icon-x mt-1 text-danger" @click="removeDocument(index)" v-if="index>0"></span>
                        </div>
                    </div>

                    <div class="text-right">
                        <span ref="loader"></span>    
                            <button type="submit" class="btn btn-primary" >Save Transporter Details<i class="icon-paperplane ml-2"></i></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {   
    data() {
        return {
            menuTabs: [
                { tabName: 'Basic Information', id: 'basicInformation', },
                { tabName: 'Bank Details', id: 'bankDetails' },
                { tabName: 'Guarantor', id: 'gurantor' },
                { tabName: 'Next of Kin', id: 'nextOfKin' },
            ],
            selected: 'Basic Information',
            basicForm: true,
            documents: ['Document 1']
        }
    },

    methods: {
        showTab(particularCell) {
            for(let i=0; i < this.menuTabs.length;  i++) {
                if(particularCell === this.menuTabs[i].tabName) {
                    this.selected = particularCell
                }
            }
        },
        toggleForm() {
            this.basicForm = !this.basicForm
        },

        addmore() {
            const count = this.documents.length + 1
            this.documents.push('Document '+count);
        },
        removeDocument(index) {
            this.documents.splice(index, 1);
        }
    }
}

</script>

<style scoped>
    ul {
        margin:0;
        padding: 0;
    }

    ul > li {
        font-size:13px;
        font-family: DIN Alternate;
        list-style-type: none;
        display: inline-block;
        cursor: pointer;
        padding:5px;
        margin:5px auto
    }
    ul > li:hover {
        border-bottom: 3px solid #ccc; 
        padding:6px;
    }
    .selectedClass {
        border-bottom: 3px solid #ccc; 
        font-size: 16px;
        color:red;  
    }
    .toggle {
        cursor: pointer;
    }

</style>