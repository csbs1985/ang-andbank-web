import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { IIndexador } from '../../models/indexador.interface';
import { IPostPayload } from '../../models/post-payload.interfcace';
import { IPutPayload } from '../../models/put-payload.interfcace';
import { IRendaFixa } from '../../models/renda-fixa.interfcace';
import { ITipoProduto } from '../../models/tipo-produto.interface';
import { RendaFixaService } from '../../services/renda-fixa.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgxCurrencyDirective],
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  private _rendaFixaService = inject(RendaFixaService);
  private _formBuilder = inject(FormBuilder);

  protected formRendaFixa!: FormGroup;

  protected message: string = "";

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

  protected _tipoProdutoList: ITipoProduto[] = [
    { id: 1, nome: "CDB" },
    { id: 2, nome: "Debênture" },
    { id: 4, nome: "LCA" },
    { id: 3, nome: "Tesouro direto" }
  ];

  protected _indexadorList: IIndexador[] = [
    { id: 1, nome: "CDI" },
    { id: 3, nome: "IPCA +" },
    { id: 4, nome: "Pós fixado" },
    { id: 2, nome: "SELIC" }
  ];

  ngOnInit(): void {
    this.createForm();
    this.getRendaFixaItem();
  }

  private createForm(): void {
    this.formRendaFixa = this._formBuilder.group({
      descricao: ["", Validators.required],
      dataValidade: ["", Validators.required],
      investimentoMinimo: ["", Validators.required],
      tipoProdutoId: ["", Validators.required],
      indexadorId: ["", Validators.required]
    })
  }

  private getRendaFixaItem(): void {
    this._rendaFixaService.rendaFixa$.subscribe((value: IRendaFixa) => {
      this._rendaFixaItem = value;
      this.fillForm();
    });
  }

  protected postRendaFixa(): void {
    const payload: IPostPayload = {
      descricao: this.formRendaFixa.get('descricao')?.value,
      dataValidade: this.formRendaFixa.get('dataValidade')?.value,
      investimentoMinimo: this.formRendaFixa.get('investimentoMinimo')?.value,
      tipoProdutoId: parseInt(this.formRendaFixa.get('tipoProdutoId')?.value),
      indexadorId: parseInt(this.formRendaFixa.get('indexadorId')?.value)
    }

    this._rendaFixaService.postRendaFixa(payload).then((result: boolean) => {
      if (result) {
        this.message = "Renda fixa criada com sucesso!";
        this.cancelRendaFixa();
      } else this.message = "Erro ao criar nova renda fixa, tente novamente";
    });
  }

  protected putRendaFixa(): void {
    const payload: IPutPayload = {
      id: this._rendaFixaItem.id!,
      descricao: this.formRendaFixa.get('descricao')?.value,
      dataValidade: this.formRendaFixa.get('dataValidade')?.value,
      investimentoMinimo: this.formRendaFixa.get('investimentoMinimo')?.value,
      tipoProdutoId: parseInt(this.formRendaFixa.get('tipoProdutoId')?.value),
      indexadorId: parseInt(this.formRendaFixa.get('indexadorId')?.value)
    }

    this._rendaFixaService.putRendaFixa(payload).then((result: boolean) => {
      this.message = result
        ? "Renda fixa alterada com sucesso!"
        : "Erro ao alterar renda fixa, tente novamente";
    });
  }


  protected deleteRendaFixa(): void {
    const id = this._rendaFixaItem.id!

    this._rendaFixaService.deleteRendaFixa(id).then((result: boolean) => {
      if (result) {
        this.message = "Renda fixa deletada com sucesso!";
        this.cancelRendaFixa();
      } else this.message = "Erro ao deletar renda fixa, tente novamente";
    });
  }

  private fillForm(): void {
    this.formRendaFixa.patchValue({
      descricao: this._rendaFixaItem.descricao,
      dataValidade: this._rendaFixaItem.dataValidade,
      investimentoMinimo: this._rendaFixaItem.investimentoMinimo,
      tipoProdutoId: this._rendaFixaItem.tipoProduto?.id,
      indexadorId: this._rendaFixaItem.indexador?.id
    });
  }

  protected cancelRendaFixa(): void {
    this._rendaFixaService.rendaFixa$.next({} as IRendaFixa);

    this.formRendaFixa.patchValue({
      descricao: "",
      dataValidade: "",
      investimentoMinimo: 0,
      tipoProdutoId: 0,
      indexadorId: 0
    });
  }
}
