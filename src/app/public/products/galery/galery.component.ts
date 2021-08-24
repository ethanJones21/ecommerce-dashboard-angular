import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormConditions } from '../../../shared/helpers/form-conditions.class';
import { GaleryService } from './galery.service';
import { Subscription, Observable } from 'rxjs';
import { IMGTYPES } from '../../../shared/models/img-types.model';
import { ImgConditions } from '../../../shared/helpers/img-conditions.class';

interface gal {
  url: string | ArrayBuffer | null;
  name: string;
}

@Component({
  selector: 'Galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss'],
})
export class GaleryComponent implements OnInit {
  nameProduct = this.galeryServ.nameProduct;
  fc = new FormConditions(this.router);
  galeryID = '';
  productID = '';
  subs = new Subscription();
  galeryForm!: FormGroup;

  imgTypes = IMGTYPES;
  files: File[] = [];
  imgEl = this.render.createElement('img');

  galery: gal[] = [];
  galery$!: Observable<any>;

  constructor(
    private render: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private galeryServ: GaleryService
  ) {}

  ngOnInit(): void {
    this.initID();
    this.initGalery();
  }

  initID() {
    this.route.params.subscribe(
      ({ productID }) => (this.productID = productID)
    );
  }

  initGalery() {
    // this.galeryServ.getGalery(this.productID).subscribe((gArr) => {
    //   gArr.forEach((name: string, i: number) => {
    //     this.galery.push({ name, url: this.galeryServ.getImg(name) });
    //   });
    // });
    this.galery$ = this.galeryServ.getGalery(this.productID);
  }

  getImg(name: string) {
    return this.galeryServ.getImg(name);
  }

  onFileChange(event: any) {
    const imgC = new ImgConditions();
    if (imgC.existImg(event)) {
      let files = <File[]>event.target.files;
      files.forEach((file, i) => {
        if (imgC.typesImg(file, this.imgTypes) && imgC.sizeImg(file, 4000000)) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.galery.push({ url: reader.result, name: file.name });
          };
          reader.readAsDataURL(file);
          this.files = files;
        }
      });
    }
  }

  resetTable() {
    this.galery = [];
  }

  submitForm() {
    this.galeryServ
      .createGalery(this.productID, this.files)
      .subscribe((resp) => {
        console.log(resp);
        this.initGalery();
        this.resetTable();
      });
  }

  deleteImg(i: number) {
    this.galery.splice(i, 1);
  }
  deleteImgOfDB(galeryID: string) {
    this.galeryServ
      .deleteImgOfGalery(this.productID, galeryID)
      .subscribe((resp) => {
        console.log(resp);
        this.initGalery();
      });
  }
}
