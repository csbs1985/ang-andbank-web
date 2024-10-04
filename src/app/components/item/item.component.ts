import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { IIndexador } from '../../models/indexador.interface';
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
    {
      id: 4, nome: "LCA"
    },
    {
      id: 1,
      nome: "CDB"
    },
    {
      id: 2,
      nome: "Debênture"
    },
    {
      id: 3,
      nome: "Tesouro direto"
    }
  ];

  protected _indexadorList: IIndexador[] = [
    {
      id: 1,
      nome: "CDI"
    },
    {
      id: 3,
      nome: "IPCA +"
    },
    {
      id: 4,
      nome: "Pós fixado"
    },
    {
      id: 2,
      nome: "SELIC"
    }
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

  protected postRendaFixa(): void {
    const payload = {
      descricao: this.formRendaFixa.get('descricao'),
      dataValidade: this.formRendaFixa.get('dataValidade'),
      investimentoMinimo: this.formRendaFixa.get('investimentoMinimo'),
      tipoProduto: this.formRendaFixa.get('tipoProduto'),
      indexador: this.formRendaFixa.get('indexador')
    }

    this._rendaFixaService.postRendaFixa(payload);
  }

  private fillForm(): void {
    this.formRendaFixa.patchValue({
      descricao: this._rendaFixaItem.descricao,
      dataValidade: this._rendaFixaItem.dataValidade,
      investimentoMinimo: this._rendaFixaItem.investimentoMinimo,
      tipoProduto: this._rendaFixaItem.tipoProduto!.nome,
      indexador: this._rendaFixaItem.indexador!.nome
    });
  }

  protected cancelRendaFixa(): void {
    this._rendaFixaService.rendaFixa$.next({} as IRendaFixa);
    this.formRendaFixa.reset();
  }
}
