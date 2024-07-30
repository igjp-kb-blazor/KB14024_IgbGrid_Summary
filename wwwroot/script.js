// 支店の集計を行うクラス
class WebGridRegionSummary {
    // 集計を行うメソッド
    operate(data) {
        const result = [];
        // 支店の数を計算し、結果に追加
        result.push({
            key: 'regionCount',
            label: '支店数',
            summaryResult: new Set(data).size
        });
        return result;
    }
}

// 売上の集計を行うクラス
class WebGridSalesSummary {
    // 集計を行うメソッド
    operate(data, allData, fieldName) {
        // 1 月のデータをフィルタリング
        const januaryData = allData.filter((rec) => rec['Month'] === '1月').map(r => r[fieldName]);
        // 東京を除いたデータをフィルタリング
        const nonTokyoData = allData.filter((rec) => rec['Region'] !== '東京').map(r => r[fieldName]);
        // 近畿地方のデータをフィルタリング
        const kinkiData = allData.filter((rec) => rec['Area'] === '近畿').map(r => r[fieldName]);
        const result = [];
        // 全体の合計を計算し、結果に追加
        result.push({
            key: 'total',
            label: '全体の合計',
            summaryResult: data.length ? "¥" + data.reduce((a, b) => +a + +b).toLocaleString() : "¥0"
        });
        // 1 月の合計を計算し、結果に追加
        result.push({
            key: 'januaryTotal',
            label: '1 月の合計',
            summaryResult: januaryData.length ? "¥" + januaryData.reduce((a, b) => +a + +b).toLocaleString() : "¥0"
        });
        // 東京を除いた合計を計算し、結果に追加
        result.push({
            key: 'nonTokyoTotal',
            label: '東京を除いた合計',
            summaryResult: nonTokyoData.length ? "¥" + nonTokyoData.reduce((a, b) => +a + +b).toLocaleString() : "¥0"
        });
        // 近畿地方の合計を計算し、結果に追加
        result.push({
            key: 'kinkiTotal',
            label: '近畿の合計',
            summaryResult: kinkiData.length ? "¥" + kinkiData.reduce((a, b) => +a + +b).toLocaleString() : "¥0"
        });
        return result;
    }
}

// 集計をカスタマイズするスクリプトを登録
igRegisterScript("WebGridCustomSummary", (event) => {
    // Region フィールドの集計には WebGridRegionSummary クラスを使用
    if (event.detail.field === "Region") {
        event.detail.summaries = WebGridRegionSummary;
    }
    // Sales フィールドの集計には WebGridSalesSummary クラスを使用
    if (event.detail.field === "Sales") {
        event.detail.summaries = WebGridSalesSummary;
    }
}, false);
