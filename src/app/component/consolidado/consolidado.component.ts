import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { Consolidado } from '../../models/consolidado';
import { ConsolidadoService } from '../../service/consolidado.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-consolidado',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    SafePipe, // Importa el pipe aquí
  ],
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css'],
})
export class ConsolidadoComponent {
  archivos: Consolidado[] = [];
  titulo: string = '';
  opc: string = '';
  consolidado = new Consolidado(0, '', '', '', 0); // Incluye id como 0 o null
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  selectedFile: File | null = null;
  modalVisible: boolean = false; // Para controlar el modal de vista previa
  archivoUrl: string | null = null; // Para almacenar la URL del archivo a visualizar

  constructor(
    private consolidadoService: ConsolidadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarArchivos();
  }

  listarArchivos() {
    this.consolidadoService.getFiles().subscribe((data) => {
      this.archivos = data;
      console.log(this.archivos); // Para verificar que cada archivo tiene un id definido
    });
  }

  showDialogUpload() {
    this.titulo = 'Subir Archivo';
    this.opc = 'Subir';
    this.op = 0;
    this.visible = true;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  confirmDeleteArchivo(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este archivo?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteArchivo(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }

  deleteArchivo(id: number) {
    this.consolidadoService.deleteFile(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El archivo ha sido eliminado exitosamente',
        });
        this.listarArchivos();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el archivo',
        });
      },
    });
  }

  uploadArchivo(): void {
    if (this.selectedFile) {
      this.consolidadoService.uploadFiles([this.selectedFile]).subscribe({
        next: (messages: string[]) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: messages[0],
          });
          this.listarArchivos();
          this.op = 0;
        },
        error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo subir el archivo',
          });
        },
      });
      this.visible = false;
    }
  }

  downloadArchivo(id: number, name: string) {
    this.consolidadoService.getFile(id).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = name;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  visualizarArchivoEnModal(id: number) {
    this.consolidadoService.getFileForPreview(id).subscribe((blob: Blob) => {
      this.archivoUrl = window.URL.createObjectURL(blob);
      this.modalVisible = true;
    });
  }

  cerrarModal() {
    this.modalVisible = false;
    this.archivoUrl = null;
  }

  confirmSaveArchivo() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas subir este archivo?'
          : '¿Estás seguro de que deseas editar este archivo?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion();
      },
    });
  }

  opcion(): void {
    if (this.op == 0) {
      this.uploadArchivo();
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'Funcionalidad de edición no implementada.',
      });
    }
  }
}
