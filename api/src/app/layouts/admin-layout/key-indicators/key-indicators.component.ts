import { Component, OnInit } from '@angular/core';
import { KeyIndicator } from '../../../models/key-indicator.model';
import { KeyIndicatorsService } from '../../../services/key-indicators.service';

@Component({
  selector: 'key-indicators',
  templateUrl: './key-indicators.component.html',
  styleUrls: ['./key-indicators.component.scss']
})
export class KeyIndicatorsComponent implements OnInit {

  tableData: KeyIndicator[] = [];
  user: string = 'admin';

  constructor(private keyIndicatorsService: KeyIndicatorsService) { }

  ngOnInit(): void {
    this.keyIndicatorsService.getKeyIndicators()
      .subscribe(resp => {
        this.tableData = resp.filter(x => x.usuario == this.user);
      });
  }

  botaoDeletarIndicador(id: any) {
    this.keyIndicatorsService.botaoDeletarIndicador(id)
      .subscribe();
  }
  
}
