import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRendaFixa } from '../../models/renda-fixa.interfcace';
import { RendaFixaService } from '../../services/renda-fixa.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  private _rendaFixaService = inject(RendaFixaService);
  private _formBuilder = inject(FormBuilder);

  protected formRendaFixa!: FormGroup;

  protected _rendaFixaItem: IRendaFixa = {
    id: 0,
    descricao: "",
    dataValidade: "",
    investimentoMinimo: 0,
    tipoProdutoId: 0,
    tipoProduto: {
      id: 0,
      nome: ""
    },
    indexadorId: 0,
    indexador: {
      id: 0,
      nome: ""
    }
  };

  ngOnInit(): void {
    this.createForm();
    this.getRendaFixaItem();
  }

  private createForm(): void {
    this.formRendaFixa = this._formBuilder.group({
      descricao: ["", Validators.required],
      dataValidade: ["", Validators.required],
      investimentoMinimo: ["", Validators.required],
      tipoProduto: ["", Validators.required],
      indexador: ["", Validators.required]
    })
  }

  private getRendaFixaItem(): void {
    this._rendaFixaService.rendaFixa$.subscribe((value: IRendaFixa) => {
      this._rendaFixaItem = value;
      this.fillForm();
    });
  }

  private fillForm(): void {
    this.formRendaFixa.patchValue({
      descricao: this._rendaFixaItem.descricao,
      dataValidade: this._rendaFixaItem.dataValidade,
      investimentoMinimo: this._rendaFixaItem.investimentoMinimo,
      tipoProduto: this._rendaFixaItem.tipoProduto.nome,
      indexador: this._rendaFixaItem.indexador.nome
    });
  }

  protected cancelRendaFixa(): void {
    this._rendaFixaService.rendaFixa$.next({} as IRendaFixa);
    this.formRendaFixa.reset();
  }
}
