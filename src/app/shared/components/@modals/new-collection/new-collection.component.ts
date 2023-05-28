import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SolanaNftService } from '@shared/services/solana-contracts/solana-nft.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.scss']
})
export class NewCollectionComponent implements OnInit {

  public form: UntypedFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    symbol: ['', Validators.required],
    description: ['', Validators.required],
  });

  public fileBuffer!: any;
  public originalName = '';
  public ext = '';
  public errorImage = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private solanaNftService: SolanaNftService,
    private dialog: MatDialogRef<NewCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  newCollection(): void {
    this.errorImage = false;
    if (!this.fileBuffer) {
      this.errorImage = true;
      return;
    }
    if (this.form.valid) {

    }
  }

  onFileSelected(): void {
    this.errorImage = false;
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileBuffer = e.target.result;
      };
      this.originalName = inputNode.files[0].name;
      this.ext = inputNode.files[0].name.split('.')[inputNode.files[0].name.split('.').length-1];
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  closeModal(): void {
    this.dialog.close();
  }

}
