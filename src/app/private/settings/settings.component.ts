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
import { formValueControlsSetting } from './helpers/form-value-controls-setting.class';
import { formValidControlsSetting } from './helpers/form-valid-controls-setting.class';
import { formErrorsControlsSetting } from './helpers/form-errors-controls-setting.class';
import { SettingClass } from './models/setting.class';
import { FormConditions } from '../../shared/helpers/form-conditions.class';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SettingService } from './setting.service';
import { SettingsService } from './settings.service';
import { ImgConditions } from '../../shared/helpers/img-conditions.class';
import { IMGTYPES } from '../../shared/models/img-types.model';

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChild('dropIconConfig') dropIconConfig!: ElementRef;

  fc = new FormConditions(this.router);
  id = '';
  subs = new Subscription();
  settingForm!: FormGroup;
  valueCC!: formValueControlsSetting;
  validCC!: formValidControlsSetting;
  errorsCC!: formErrorsControlsSetting;

  imgTypes = IMGTYPES;
  file!: File;
  imgSelect: any | ArrayBuffer = '';
  imgEl = this.render.createElement('img');

  constructor(
    private render: Renderer2,
    private fb: FormBuilder,
    private router: Router,
    private settingServ: SettingService,
    private settingsServ: SettingsService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initSetting();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  ngDoCheck(): void {
    this.render.setAttribute(this.imgEl, 'src', this.imgSelect);
    if (this.dropIconConfig)
      this.render.appendChild(this.dropIconConfig.nativeElement, this.imgEl);
  }

  initSetting() {
    this.subs.add(
      this.settingsServ
        .getSetting()
        .subscribe(({ title, logo, categories, serie, correlative }) => {
          this.settingForm.setValue({
            titleSetting: title,
            categoriesSetting: [],
            serieSetting: serie,
            correlativeSetting: correlative,
          });
          this.imgSelect = this.settingsServ.getImg(logo);
          categories.forEach((categoryObj) => {
            this.valueCC.categories.push(
              this.fb.group({
                categoryCollection: [
                  categoryObj.collection,
                  Validators.required,
                ],
                categoryName: [categoryObj.name, Validators.required],
                icon: [categoryObj.icon, Validators.required],
              })
            );
          });
        })
    );
  }

  initForm() {
    this.settingForm = this.fb.group({
      titleSetting: ['', Validators.required],
      categoriesSetting: this.fb.array([]),
      serieSetting: ['001', Validators.required],
      correlativeSetting: ['001', Validators.required],
    });
    this.initControls();
  }

  private initControls() {
    this.valueCC = new formValueControlsSetting(this.settingForm);
    this.validCC = new formValidControlsSetting(this.settingForm);
    this.errorsCC = new formErrorsControlsSetting(this.settingForm);
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control: any) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.settingServ.reset(form);
          });
        } else {
          control.markAsTouched();
          this.settingServ.reset(form);
        }
      });
    } else {
      const setting = new SettingClass(form);
      this.settingsServ
        .updateSetting(setting, this.file)
        .subscribe(({ ok, msg, setting }) =>
          this.fc.submitSuccessNoRedirect(ok, msg, setting)
        );
    }
  }

  addCategory() {
    this.valueCC.categories.push(
      this.fb.group({
        categoryCollection: ['', Validators.required],
        categoryName: ['', Validators.required],
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
