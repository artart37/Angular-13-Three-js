import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShapeSpaceComponent } from '../shape-space.component';
// Imprt everything from three js for demo
import * as THREE from 'three';


@NgModule({
    declarations: [
        ShapeSpaceComponent
    ],
    imports: [CommonModule],
    exports: [ShapeSpaceComponent]
})
export class ShapeSpace { }
