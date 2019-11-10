namespace morn
{
	export class TreeListSubItem<C extends Box> extends Box implements ITreeListSubItem
	{
		tree: TreeList;
		mainIndex: number
		index: number;

		protected _skin: C;
		data: any;
		public constructor()
		{
			super();
		}

		init(): void
		{
			this.addChild(this._skin);
		}

		getData(): any
		{
			return this.data
		}

		setData(value: any): void
		{
			this.data = value;
		}

		setSelected(value: boolean): void
		{

		}

		getSelected(): boolean
		{
			return false;
		}

		public destroy(): void
		{
			if (this._skin)
			{
				this._skin.remove();
				this._skin.destroy();
				this._skin = null
			}
			this.data = null;
			this.tree = null;
			super.destroy();
		}
	}
}