import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  DoCheck,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formValueControlsConfig } from './helpers/form-value-controls-config.class';
import { formValidControlsConfig } from './helpers/form-valid-controls-config.class';
import { formErrorsControlsConfig } from './helpers/form-errors-controls-config.class';
import { ConfigClass } from './models/config.class';
import { FormConditions } from '../../shared/helpers/form-conditions.class';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigService } from './config.service';
import { ConfigsService } from './configs.service';
import { ImgConditions } from '../../shared/helpers/img-conditions.class';
import { IMGTYPES } from '../../shared/models/img-types.model';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss'],
})
export class ConfigsComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChild('dropIconConfig') dropIconConfig!: ElementRef;

  fc = new FormConditions(this.router);
  id = '';
  subs = new Subscription();
  configForm!: FormGroup;
  valueCC!: formValueControlsConfig;
  validCC!: formValidControlsConfig;
  errorsCC!: formErrorsControlsConfig;

  imgTypes = IMGTYPES;
  file!: File;
  imgSelect: any | ArrayBuffer = '';
  imgEl = this.render.createElement('img');

  constructor(
    private render: Renderer2,
    private fb: FormBuilder,
    private router: Router,
    private configServ: ConfigService,
    private configsServ: ConfigsService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initConfig();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  ngDoCheck(): void {
    this.render.setAttribute(this.imgEl, 'src', this.imgSelect);
    if (this.dropIconConfig)
      this.render.appendChild(this.dropIconConfig.nativeElement, this.imgEl);
  }

  initConfig() {
    this.subs.add(
      this.configsServ
        .getConfig()
        .subscribe(({ title, logo, categories, serie, correlative }) => {
          this.configForm.setValue({
            titleConfig: title,
            categoriesConfig: [],
            serieConfig: serie,
            correlativeConfig: correlative,
          });
          this.imgSelect = this.configsServ.getImg(logo);
          categories.forEach((categoryObj) => {
            this.valueCC.categories.push(
              this.fb.group({
                category: [categoryObj.category, Validators.required],
                icon: [categoryObj.icon, Validators.required],
              })
            );
          });
        })
    );
  }

  initForm() {
    this.configForm = this.fb.group({
      titleConfig: ['', Validators.required],
      categoriesConfig: this.fb.array([]),
      serieConfig: ['001', Validators.required],
      correlativeConfig: ['001', Validators.required],
    });
    this.initControls();
  }

  private initControls() {
    this.valueCC = new formValueControlsConfig(this.configForm);
    this.validCC = new formValidControlsConfig(this.configForm);
    this.errorsCC = new formErrorsControlsConfig(this.configForm);
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control: any) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.configServ.reset(form);
          });
        } else {
          control.markAsTouched();
          this.configServ.reset(form);
        }
      });
    } else {
      const config = new ConfigClass(form);
      this.configsServ
        .updateConfig(config, this.file)
        .subscribe(({ ok, msg, config }) =>
          this.fc.submitSuccessNoRedirect(ok, msg, config)
        );
    }
  }

  addCategory() {
    this.valueCC.categories.push(
      this.fb.group({
        category: ['', Validators.required],
        icon: ['', Validators.required],
      })
    );
  }

  onFileChange(event: any) {
    let reader = new FileReader();
    const imgC = new ImgConditions();
    if (imgC.existImg(event)) {
      let file = <File>event.target.files[0];
      if (imgC.typesImg(file, this.imgTypes) && imgC.sizeImg(file, 4000000)) {
        reader.onload = (e) => (this.imgSelect = reader.result);

        // this.addAndRemoveClass();

        reader.readAsDataURL(file);
        this.file = file;
      } else {
        this.imgSelect = '';
      }
    }
  }

  // private addAndRemoveClass() {
  //   this.render.addClass(
  //     this.dropIconConfig.nativeElement,
  //     'cs-file-drop-preview'
  //   );
  //   this.render.addClass(this.dropIconConfig.nativeElement, 'img-thumbnail');
  //   this.render.addClass(this.dropIconConfig.nativeElement, 'rounded');
  //   this.render.removeClass(
  //     this.dropIconConfig.nativeElement,
  //     'cs-file-drop-icon'
  //   );
  //   this.render.removeClass(this.dropIconConfig.nativeElement, 'cxi-upload');
  // }
}
