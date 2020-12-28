import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  id: number;
  your_name : string ="";
  email_address : string ="";
  password: string ="";
  confirm_password: string ="";
  gender: string = "";
  date_of_birth: string = "";
  disabledButton;
  action = null;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private accessPrvds: AccessProviders,
    private actRoute: ActivatedRoute,


    ){}

  ngOnInit() {
    this.action = this.actRoute.snapshot.paramMap.get('action');


    this.actRoute.params.subscribe((data: any) =>{
        console.log(data);
        this.id = data.id;
        if(this.id != 0){
          this.loadUser();
        }
    });
  }
 
  ionViewDidEnter(){
    this.disabledButton = false;
  }


  loadUser(){
    return new Promise(resolve => {
        let body = {
          aksi: 'load_single_data',
          id: this.id
        }
        this.accessPrvds.postData(body, 'proces_api.php').subscribe((res: any)=>{
            this.your_name = res.result.your_name;
            this.gender = res.result.gender;
            this.date_of_birth = res.result.date_of_birth;
            this.email_address = res.result.email_address;
        });
    });
  }
                async crudAction(a){
                    if(this.your_name == ""){
                    this.presentToast('Your Name is required');
                    }
                    else if(this.gender == ""){
                    this.presentToast('Gender is required');
                    }
                    else if(this.date_of_birth == ""){
                    this.presentToast('Date of Birth is required');
                    }
                    else if(this.email_address == ""){
                    this.presentToast('Email ID is required');
                    }
                  else{
                    this.disabledButton = true;
                    const loader = await this.loadingCtrl.create({
                      message: 'Please Wait.....',
                    })
                    loader.present();
                    return new Promise(resolve =>{
                      let body ={
                        aksi: 'proses_crud',
                        id: this.id,
                        your_name: this.your_name,
                        gender: this.gender,
                        date_of_birth: this.date_of_birth,
                        email_address: this.email_address,
                        password: this.password,
                        action: a
                  
                      }
                      this.accessPrvds.postData(body, 'proces_api.php').subscribe((res: any)=>{
                          if(res.success==true){
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentToast(a+res.msg);
                            this.router.navigate(['/home']);
                           
                          }
                          else{
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentAlert(res.msg,a);
                            
                          }
                      }, (err)=>{
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentAlert('Timeout',a);
                      })
                    });
                  }
                }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message:a,
      duration: 1500,
      position:'top'

    });
    toast.present();
  }

  async presentAlert(a,b) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss:false,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Close: blah');
            //action
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.crudAction(b);
           }
        }
      ]
    });

    await alert.present();
  }

  openCrud(a,b){
    this.router.navigate(['/crud/'+a+'/'+b])
  }
}

