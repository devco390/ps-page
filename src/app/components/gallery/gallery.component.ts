import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ps-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images = [
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2Fshutterstock_242497756.jpg?alt=media&token=df882298-4bd4-4f92-8999-f7d3484a96b3',
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2Fshutterstock_1719513457.jpg?alt=media&token=e09e6c78-ea16-4370-b6ec-82b9a8a02289',
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2Fshutterstock_1347514346.jpg?alt=media&token=987ba22d-738b-4964-b237-3eb9cf78203b',
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2Fshutterstock_1158108100.jpg?alt=media&token=99199a46-3f2a-47c0-b014-86c5f86d96dd',
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2FIMG_6363.jpg?alt=media&token=4e83b555-204e-4391-900a-b04dd7372956',
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2FIMG_6333.jpg?alt=media&token=a4d6e3f0-38b4-4b1b-9526-c1fed4b341cb',
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2FIMG_6311.jpg?alt=media&token=e72e9592-ad1d-457e-baea-0a5cfd33739c',
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2FIMG_6305.jpg?alt=media&token=d19ff4bc-0915-4bf6-ab8c-02bcb999c6fa',
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/gallery%2FIMG_6317.jpg?alt=media&token=80f4b538-f6cf-43f5-b471-9315b11981f1'
  ];
  currentSlide = 0;
  document: any;

  constructor(@Inject(DOCUMENT) _document: any) {
    this.document = _document;
  }

  ngOnInit(): void {}

  openModal() {
    this.document.querySelector('.lightboxContainer').style.display = 'flex';
    this.document.body.style.overflow = 'hidden';
    this.document.querySelector('.gallery').style.filter = 'blur(5px)';
  }

  closeModal() {
    this.document.querySelector('.lightboxContainer').style.display = 'none';
    this.document.body.style.overflow = 'initial';
    this.document.querySelector('.gallery').style.filter = 'blur(0)';
  }

  changeImage(n) {
    this.document.querySelector('#activeImage').src = this.images[n];
    this.currentSlide = n;
    return this.currentSlide;
  }

  nextSlide(n) {
    if (this.currentSlide < 1 && n == -1) {
      this.currentSlide = this.images.length - 1;
      this.document.querySelector('#activeImage').src = this.images[
        this.currentSlide
      ];
      return this.currentSlide;
    } else if (
      this.currentSlide < this.images.length - 1 &&
      this.currentSlide >= 0 &&
      n == 1
    ) {
      this.currentSlide = this.currentSlide + 1;
      this.document.querySelector('#activeImage').src = this.images[
        this.currentSlide
      ];
      return this.currentSlide;
    } else if (this.currentSlide == this.images.length - 1 && n == 1) {
      this.currentSlide = 0;
      this.document.querySelector('#activeImage').src = this.images[
        this.currentSlide
      ];
      return this.currentSlide;
    } else {
      this.currentSlide = this.currentSlide - 1;
      this.document.querySelector('#activeImage').src = this.images[
        this.currentSlide
      ];
      return this.currentSlide;
    }
  }
}
