import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModel } from './image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  images: ImageModel[] = [];
  constructor(private sanitizer: DomSanitizer) {}

  fileChange(fileChangEvent: any) {
    const imageUrl: any = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(fileChangEvent.target.files[0])
    );
    this.images = [new ImageModel(imageUrl), ...this.images];
  }

  drop(event: CdkDragDrop<ImageModel[]>) {
    console.log({ event });
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }

  selectImage(selectedImage: ImageModel, selectedImgIndex?: number) {
    const previouslySelectedImageIndex: number = this.images.findIndex(
      (image) => image.selected
    );
    if (
      previouslySelectedImageIndex !== -1 &&
      selectedImgIndex !== previouslySelectedImageIndex
    ) {
      this.images[previouslySelectedImageIndex].selected = false;
    }
    selectedImage.selected = !selectedImage.selected;
  }
}
