import HC_exporting from 'highcharts/modules/exporting';
import { Component, OnInit } from '@angular/core';
//highcharts
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModal } from '../employee.model';
import { ApiServiceService } from '../services/api-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    admin: any = {}
    profileImage: string = "https://www.translitescaffolding.com/wp-content/uploads/2013/06/user-avatar.png"

    showDiv: boolean = true;
    showSideBar: boolean = true
    employeecount:number=0
    selected: Date | null = new Date()
    //high chart
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions = {}

    constructor(private api: ApiServiceService, private router: Router) {
        this.chartOptions = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Project Completion report'
            },
            //to remove watermark
            credits: {
                enabled: false

            },

            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            series: [
                {
                    name: 'Percentage',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Chrome',
                            y: 55.02
                        },
                        {
                            name: 'Edge',

                            y: 26.71
                        },
                        {
                            name: 'FireFox',
                            y: 1.09
                        },
                        {
                            name: 'Safari',
                            y: 15.5
                        },
                        {
                            name: 'Opera',
                            y: 1.68
                        }
                    ]
                }
            ]
        }
        HC_exporting(Highcharts);

        //to get admin data
        this.getAdmin()

    }
    ngOnInit(): void {
        this.getallEmployee()
    }

    //to conditionally render the edit divs
    updateprofilediv() {
        this.showDiv = false
        // const id = '1'
        //this.getAdmin('1')
    }



    //to get admin data-----this is fine but you can also get the admin details by calling loginpi inside the constructor 
    /* getAdmin(id: any) {
        this.api.getanemployeeApi(id).subscribe({
            next: (res: any) => {
                console.log(res);
                this.admin = res

            },
            error: (err: any) => {
                console.log(err);


            }

        })


    } */

    getAdmin() {
        this.api.loginApi().subscribe({
            next: (res: any) => {
                console.log(res);
                this.admin = res
                if (res.image) {
                    this.profileImage = res.image
                }

            },
            error: (err: any) => {
                console.log(err);
            }

        })
    }
    //update admin
    /*  updateAdmin(id: any) {
         this.api.updateEmployeeDataApi(id, this.admin).subscribe({
             next: (res: any) => {
                 console.log(res);
                 alert(`Admin details updated successfully`)
                 this.showDiv = true
 
             },
             error: (err: any) => {
                 console.log(err);
 
             }
         })
     } */

    updateAdmin() {
        this.api.updateAdminApi(this.admin).subscribe({
            next: (res: any) => {
                console.log(res);
                alert('admin updated successfully');

                this.admin = res
                if (res.image) {
                    this.profileImage = res.image
                }

            },
            error: (err: any) => {
                console.log(err);


            }
        })

        this.showDiv = true

    }

    //update image
    getFile(event: any) {
        let file = event.target.files[0]
        console.log(file);
        //to convert to url -  FileReader()

        //1) create an object for FileReader class
        let fr = new FileReader()
        //convert file to url
        fr.readAsDataURL(file)
        //access the url using onload function
        fr.onload = (event: any) => {
            console.log(event.target.result);
            this.profileImage = event.target.result;
            this.admin.image = event.target.result;

        }

    }

    //cancel update

    canceladminUpdate() {
        //this.getAdmin('1');
        this.showDiv = true
        this.getAdmin()

    }

    //handlesidebar
    handleSidebar() {
        this.showSideBar = !this.showSideBar
    }

    //to get employee count

    getallEmployee() {
        this.api.getEmployeeApi().subscribe({
            next: (res: any) => {
                console.log(res);
                this.employeecount=res.length

            },
            error: (err: any) => {
                console.log(err);
            }
        })
    }



}

