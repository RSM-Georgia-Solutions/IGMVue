<template>
    <v-container fluid>
    
        <v-layout align-space-around justify-space-around column fill-height>
    
            <v-autocomplete :items="Types" v-model="Accident.type" label="ტიპი" placeholder="არჩევა..." required></v-autocomplete>
    
            <v-autocomplete :items="buildings" item-text="branch" item-value="id" label="შენობა" placeholder="არჩევა..." required @change="onBuildingChange"></v-autocomplete>
    
            <v-autocomplete :items="buildingFloors" label="სართული" placeholder="არჩევა..." required @change="onFloorChange"></v-autocomplete>
    
            <v-autocomplete :items="floorSectors" item-text="name" item-value="id" v-model="Accident.SectorId" label="სექტორი" placeholder="არჩევა..." required></v-autocomplete>
    
            <v-autocomplete :items="Priority" item-text="Name" item-value="id" v-model="Accident.Priority" label="პრიორიტეტი" placeholder="არჩევა..." required></v-autocomplete>
    
            <v-autocomplete :items="users" item-text="username" item-value="id" label="პასუხისმგებელი პირი" placeholder="არჩევა..." required></v-autocomplete>
    
            <v-textarea placeholder="კომენტარი" v-model="Accident.Comment"></v-textarea>
    
            <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
    
            <input type="file" style="display: none" ref="image" accept="image/" @change="mounted">
    
            <v-dialog v-model="dialog" max-width="290">
    
                <v-card>
    
                    <v-card-actions>
    
                        <v-spacer></v-spacer>
    
                        <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
    
                    </v-card-actions>
    
                </v-card>
    
            </v-dialog>
    
            <v-btn color="success" @click="AddAccident() ; dialog = true">ინციდენტის დამატება</v-btn>
    
            <v-dialog v-model="dialog" max-width="490">
    
                <v-card>
    
                    <v-card-title :class="dialogColor">{{dialogText}}</v-card-title>
    
                    <v-card-actions>
    
                        <v-btn :color="dialogColor" flat @click="dialog = false">
    
                            OK
    
                        </v-btn>
    
                    </v-card-actions>
    
                </v-card>
    
            </v-dialog>
    
        </v-layout>
    
    </v-container>
</template>

<script>
    import axios from 'axios';
    
    export default {
    
        created() {
    
            axios.get(this.$store.state.baseUrl + '/buildings')
    
                .then(res => {
                   
                    const BuildingsRes = res.data
                     console.log(BuildingsRes)
                    for (let key in BuildingsRes) {
    
                        const BuildingRes = BuildingsRes[key]
    
                        this.buildings.push(BuildingRes)
    
                    }
    
                })
    
                .catch(error => console.log(error))


                axios.get(this.$store.state.baseUrl + '/users', {
                    headers : {
                        Authorization : 'Bearer ' + localStorage.token
                    }
                })
    
                .then(res => {
                   
                    const UsersRes = res.data
                     console.log(UsersRes)
                    for (let key in UsersRes) {
    
                        const UserRes = UsersRes[key]
    
                        this.users.push(UserRes)
    
                    }

                    console.log(this.users , 'aaaaaaaaaaa')
    
                })
    
                .catch(error => console.log(error))
    
    
        },
    
        data: () => ({
    
            dialog: false,
    
            dialogText: '',
    
            dialogColor: '',
    
            activeBuilding: null,
    
            activeFloor: null,
    
            Types: ['ნათურა გადაიწვა', 'დასვრილია', 'გატეხილია'],
    
            Priority: [{
    
                    Name: 'მაღალი',
    
                    id: 1
    
                },
    
                {
    
                    Name: 'საშუალო',
    
                    id: 2
    
                },
    
                {
    
                    Name: 'დაბალი',
    
                    id: 23
    
                }
    
            ],
    
            title: "Image Upload",
    
            dialog: false,
    
            buildings: [],

            users: [],
    
            Accident: {
    
                Type: '',
    
                SectorId: '',
    
                Priority: '',
    
                Technician: 'გოჩა',
    
                Comment: ''
    
            },
    
            imageName: '',
    
            ShowAlertVar: 'None'
    
        }),
    
        computed: {
    
            buildingFloors() {
    
                if (this.activeBuilding)
    
                    return this.activeBuilding.floors.map(function(f) {
    
                        return f.floorNumber;
    
                    });
    
                return [];
    
            },
    
            floorSectors() {
    
                if (this.activeFloor)
    
                    return this.activeFloor.sectors.map(function(f) {
    
                        return f;
    
                    });
    
                return [];
    
            }
    
        },
    
        methods: {
    
            AddAccident() {
               console.log(this.Accident)
             var x =  JSON.stringify(this.Accident)
             console.log(x)
                axios.post(this.$store.state.baseUrl + '/accidents', this.Accident)
    
                    .then(res => {
    
                        console.log(res);
    
                        if (res.status == '202') { 
    
                            console.log('abc1')
    
                            this.dialogText = "ინციდენტი წარმატებით დაემატა";
    
                            this.dialogColor = "success";
    
                        } else {
    
                            console.log('abc')
    
                        }
    
                    })
    
                    .catch(error =>
    
                        {
    
                            this.dialogText = "ინციდენტის დამატება ვერ მოხერხდა";
    
                            this.dialogColor = "error";
    
                            // this.ShowAlertVar = "Error"
    
                        }
    
                    )
    
            },
    
            mounted() {
    
                this.video = this.$refs.video;
    
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    
                    stream => {
    
                        this.video.src = window.URL.createObjectURL(stream);
    
                        this.video.play();
    
                    };
    
                }
    
            },
    
            onBuildingChange(buildingId) {
    
                var building = this.buildings.find(b => b.id == buildingId);
    
                this.activeBuilding = building;
    
            },
    
            onFloorChange(floor) {
    
                var floor = this.activeBuilding.floors.find(b => b.floorNumber == floor);
    
                this.activeFloor = floor;
    
            },
    
            pickFile() {
    
                this.$refs.image.click()
    
            },
    
            onFilePicked(e) {
    
                const files = e.target.files
    
                if (files[0] !== undefined) {
    
                    this.imageName = files[0].name
    
                    if (this.imageName.lastIndexOf('.') <= 0) {
    
                        return
    
                    }
    
                    const fr = new FileReader()
    
                    fr.readAsDataURL(files[0])
    
                    fr.addEventListener('load', () => {
    
                        this.imageUrl = fr.result
    
                        this.imageFile = files[0] // this is an image file that can be sent to server...
    
                    })
    
                } else {
    
                    this.imageName = ''
    
                    this.imageFile = ''
    
                    this.imageUrl = ''
    
                }
    
            }
    
        }
    
    }
</script>

<style>
    
</style>
