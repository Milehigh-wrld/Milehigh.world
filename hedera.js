import com.hedera.hashgraph.sdk.AccountCreateTransaction;
import com.hedera.hashgraph.sdk.AccountId;
import com.hedera.hashgraph.sdk.Hbar;
import com.hedera.hashgraph.sdk.PrivateKey;
import com.hedera.hashgraph.sdk.TransactionReceipt;
import com.hedera.hashgraph.sdk.TransactionResponse;
import com.hedera.hashgraph.sdk.Client;

public class CreateAccount {
    public static void main(String[] args) throws Exception {
        // Initialize the Hedera client
        Client client = Client.forTestnet(); // or Client.forMainnet()
        client.setOperator(operatorId, operatorPrivateKey);

        // Generate a new private key for the new account
        PrivateKey privateKey = PrivateKey.generate();

        // Create the account create transaction
        AccountCreateTransaction transaction = new AccountCreateTransaction()
            .setKey(privateKey.getPublicKey())
            .setInitialBalance(new Hbar(1000));

        // Submit the transaction to a Hedera network
        TransactionResponse txResponse = transaction​⬤