export const getAllDocs = async ({ collection, queries = [] }) => {
  try {
    let ref = db.collection(collection);

    // aplica as queries (onde possível)
    for (const q of queries) {
      const [field, op, value] = q;
      ref = ref.where(field, op, value);
    }

    const snapshot = await ref.get();
    const itens = snapshot.docs.map(doc => doc.data()).filter(d => !d.isDeleted);
    return itens;
  } catch (error) {
    console.error("Erro getAllDocs:", error);
    return [];
  }
};
