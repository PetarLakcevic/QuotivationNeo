package pws.quo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import pws.quo.web.rest.TestUtil;

class QuoteSuggestionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuoteSuggestion.class);
        QuoteSuggestion quoteSuggestion1 = new QuoteSuggestion();
        quoteSuggestion1.setId(1L);
        QuoteSuggestion quoteSuggestion2 = new QuoteSuggestion();
        quoteSuggestion2.setId(quoteSuggestion1.getId());
        assertThat(quoteSuggestion1).isEqualTo(quoteSuggestion2);
        quoteSuggestion2.setId(2L);
        assertThat(quoteSuggestion1).isNotEqualTo(quoteSuggestion2);
        quoteSuggestion1.setId(null);
        assertThat(quoteSuggestion1).isNotEqualTo(quoteSuggestion2);
    }
}
