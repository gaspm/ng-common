import {DynamicDialogConfig} from 'primeng/primeng';

export class DialogConfigUtil {
  public static getBasicXsConfig(): DynamicDialogConfig {
    const dialogConfig = new DynamicDialogConfig();
    dialogConfig.baseZIndex = 10000;
    dialogConfig.width = '320px';
    dialogConfig.dismissableMask = true;
    dialogConfig.styleClass = 'ui-dialog-mobile';
    return dialogConfig;
  }

  public static getBasicSmConfig(): DynamicDialogConfig {
    const dialogConfig = new DynamicDialogConfig();
    dialogConfig.baseZIndex = 10000;
    dialogConfig.dismissableMask = true;
    dialogConfig.width = '460px';
    return dialogConfig;
  }

  public static getBasicMdConfig(): DynamicDialogConfig {
    const dialogConfig = new DynamicDialogConfig();
    dialogConfig.baseZIndex = 10000;
    dialogConfig.dismissableMask = true;
    dialogConfig.width = '670px';
    return dialogConfig;
  }

  public static getBasicLgConfig(): DynamicDialogConfig {
    const dialogConfig = new DynamicDialogConfig();
    dialogConfig.baseZIndex = 10000;
    dialogConfig.width = '70%';
    dialogConfig.height = '80vh';
    dialogConfig.dismissableMask = true;
    dialogConfig.styleClass = 'ui-dialog-mobile';

    return dialogConfig;
  }
}
